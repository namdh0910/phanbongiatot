import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const groqApiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

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
 * Robust AI Content Generation with Fallback Mechanism (Gemini -> Groq)
 */
export async function generateAIContent(prompt: string, systemPrompt?: string): Promise<AIResponse> {
  // Ordered list of models to try
  const models = ["gemini-2.0-flash", "gemini-1.5-flash-latest"];
  
  let lastError: any;

  // 1. Try Gemini models first
  for (const modelName of models) {
    try {
      console.log(`[Gemini AI] Attempting connection with model: ${modelName}`);
      
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        safetySettings
      }, { apiVersion: 'v1' });

      const fullPrompt = systemPrompt ? `${systemPrompt}\n\nUSER REQUEST: ${prompt}` : prompt;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      if (!text) throw new Error("Empty response from AI");

      console.log(`[Gemini AI] Success with model: ${modelName}`);
      return { success: true, text, modelUsed: modelName };

    } catch (error: any) {
      console.error(`[Gemini AI] Error with model ${modelName}:`, error.message);
      lastError = error;
      
      if (error.message?.includes("429") || error.message?.includes("Quota")) {
        console.log(`[Gemini AI] Quota exceeded for ${modelName}, falling back...`);
        continue;
      }
      continue;
    }
  }

  // 2. Fallback to Groq (Llama 3) if Gemini fails and Groq key is available
  if (groqApiKey) {
    try {
      console.log(`[Groq AI] Falling back to Llama 3 (Groq)...`);
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
        console.log(`[Groq AI] Success with model: llama-3.3-70b-versatile`);
        return { 
          success: true, 
          text: data.choices[0].message.content, 
          modelUsed: "llama-3.3-70b (Groq)" 
        };
      } else {
        console.error("[Groq AI] Failed to get content:", data);
      }
    } catch (error: any) {
      console.error("[Groq AI] Critical error:", error.message);
    }
  }

  return { 
    success: false, 
    error: lastError?.message || "All models failed (Gemini + Groq)",
    details: lastError 
  };
}
