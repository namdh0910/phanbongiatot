import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKeyString = process.env.GEMINI_API_KEY || "";
const apiKeys = apiKeyString.split(',').map(k => k.trim()).filter(k => k.length > 0);
const groqApiKey = process.env.GROQ_API_KEY;
const openRouterApiKey = process.env.OPENROUTER_API_KEY;

if (apiKeys.length === 0) {
  throw new Error("Missing GEMINI_API_KEY in environment variables.");
}

// Biến để theo dõi key đang sử dụng (rotation)
let currentKeyIndex = 0;

function getNextGeminiKey() {
  const key = apiKeys[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
  return key;
}

// Safety settings for agricultural/professional content
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

type AIResponse = 
  | { success: true; text: string; modelUsed: string }
  | { success: false; error: string; details?: any };

/**
 * Robust AI Content Generation with Multi-Provider Fallback (Gemini Rotation -> Groq -> OpenRouter)
 */
export async function generateAIContent(prompt: string, systemPrompt?: string): Promise<AIResponse> {
  const models = ["gemini-2.0-flash-exp", "gemini-1.5-flash", "gemini-1.5-pro"];
  let lastError: any;

  // 1. THỬ GEMINI VỚI CƠ CHẾ XOAY VÒNG KEY (ROTATION)
  for (let attempt = 0; attempt < apiKeys.length; attempt++) {
    const currentApiKey = getNextGeminiKey();
    const genAI = new GoogleGenerativeAI(currentApiKey);

    for (const modelName of models) {
      try {
        console.log(`[Gemini AI] Attempting with model: ${modelName} (Key index: ${currentKeyIndex})`);
        
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          safetySettings
        }, { apiVersion: 'v1' });

        const fullPrompt = systemPrompt ? `${systemPrompt}\n\nUSER REQUEST: ${prompt}` : prompt;
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        if (text) {
          console.log(`[Gemini AI] Success with ${modelName}`);
          return { success: true, text, modelUsed: modelName };
        }
      } catch (error: any) {
        console.error(`[Gemini AI] Error with ${modelName}:`, error.message);
        lastError = error;
        
        if (error.message?.includes("429") || error.message?.includes("Quota")) {
          console.warn(`[Gemini AI] Key hit quota, rotating to next key...`);
          break; // Thoát vòng lặp model để đổi Key
        }
      }
    }
  }

  // 2. DỰ PHÒNG 1: GROQ (LLAMA 3.3)
  if (groqApiKey) {
    try {
      console.log(`[Groq AI] Falling back to Groq...`);
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 4096
        })
      });

      const data = await response.json();
      if (data.choices?.[0]?.message?.content) {
        return { success: true, text: data.choices[0].message.content, modelUsed: "llama-3.3-70b (Groq)" };
      }
    } catch (error: any) {
      console.error("[Groq AI] Error:", error.message);
    }
  }

  // 3. DỰ PHÒNG 2: OPENROUTER (DeepSeek-V3)
  if (openRouterApiKey) {
    try {
      console.log(`[OpenRouter AI] Falling back to OpenRouter (DeepSeek)...`);
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterApiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://phanbongiatot.com",
          "X-Title": "Phan Bon Gia Tot Admin"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
            { role: "user", content: prompt }
          ],
          temperature: 0.7
        })
      });

      const data = await response.json();
      if (data.choices?.[0]?.message?.content) {
        return { success: true, text: data.choices[0].message.content, modelUsed: "DeepSeek-V3 (OpenRouter)" };
      }
    } catch (error: any) {
      console.error("[OpenRouter AI] Error:", error.message);
    }
  }

  return { 
    success: false, 
    error: "Tất cả các con AI đều đang bận hoặc hết hạn mức. Bà con hãy thử lại sau 1 phút!",
    details: lastError 
  };
}
