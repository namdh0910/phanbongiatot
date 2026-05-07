import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("[TEST-GEMINI] API Key exists:", !!apiKey);
  
  if (!apiKey) {
    return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
  }

  const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash-exp"];
  let results = [];

  for (const modelName of models) {
    try {
      console.log(`[TEST-GEMINI] Testing model: ${modelName}`);
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const result = await model.generateContent("Say 'Hello from " + modelName + "'");
      const text = result.response.text();
      
      results.push({ model: modelName, success: true, response: text });
      console.log(`[TEST-GEMINI] Success: ${modelName}`);
    } catch (err: any) {
      console.error(`[TEST-GEMINI] Error with ${modelName}:`, err);
      results.push({ 
        model: modelName, 
        success: false, 
        error: err?.message || "Unknown error",
        fullError: err 
      });
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    apiKeyPresent: !!apiKey,
    results
  });
}
