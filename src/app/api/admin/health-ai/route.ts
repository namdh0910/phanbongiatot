import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY || "";
  
  if (!apiKey) {
    return NextResponse.json({ 
      status: "error", 
      message: "Missing GEMINI_API_KEY in environment variables." 
    }, { status: 500 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    
    // Quick test call
    const result = await model.generateContent("Say 'AI OK'");
    const text = result.response.text();

    return NextResponse.json({
      status: "success",
      message: "Gemini API is working correctly.",
      response: text,
      apiKeyPreview: `${apiKey.substring(0, 8)}...`
    });
  } catch (err: any) {
    return NextResponse.json({
      status: "error",
      message: err?.message || "Failed to communicate with Gemini API",
      technicalDetail: err
    }, { status: 500 });
  }
}
