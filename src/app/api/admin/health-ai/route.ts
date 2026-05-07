import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY!;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    }, { apiVersion: 'v1' });

    const result = await model.generateContent("AI status check");
    const text = result.response.text();

    return NextResponse.json({
      status: "success",
      model: "gemini-1.5-flash",
      text
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      error: error?.message || "AI Service Down"
    }, { status: 500 });
  }
}
