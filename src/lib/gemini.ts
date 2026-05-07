import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

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
 * Robust AI Content Generation with Fallback Mechanism
 */
export async function generateAIContent(prompt: string, systemPrompt?: string): Promise<AIResponse> {
  // Ordered list of models to try
  // gemini-2.0-flash is preferred but has tight free quota
  // gemini-1.5-flash-latest is stable and generous
  const models = ["gemini-2.0-flash", "gemini-1.5-flash-latest"];
  
  let lastError: any;

  for (const modelName of models) {
    try {
      console.log(`[Gemini AI] Attempting connection with model: ${modelName}`);
      
      // Force v1 for stability across all models
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        safetySettings
      }, { apiVersion: 'v1' });

      // Combine system prompt if provided
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
      
      // If quota exceeded (429), try next model immediately
      if (error.message?.includes("429") || error.message?.includes("Quota")) {
        console.log(`[Gemini AI] Quota exceeded for ${modelName}, falling back...`);
        continue;
      }
      
      // For other errors, also try falling back unless it's a critical auth error
      if (error.message?.includes("401") || error.message?.includes("API key")) {
        break; 
      }
      
      continue;
    }
  }

  return { 
    success: false, 
    error: lastError?.message || "All models failed",
    details: lastError 
  };
}
