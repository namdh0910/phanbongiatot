import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY!;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent("hello");
    const text = result.response.text();

    return NextResponse.json({
      model: "gemini-1.5-flash",
      response: text
    });
  } catch (error: any) {
    console.error("[TEST-GEMINI] Error:", error);
    return NextResponse.json({
      error: error?.message || "Internal Server Error",
      fullError: error
    }, { status: 500 });
  }
}
