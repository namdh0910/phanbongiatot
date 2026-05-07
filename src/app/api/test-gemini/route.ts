import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Force v1 API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET(req: NextRequest) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    }, { apiVersion: 'v1' });

    const result = await model.generateContent("Xin chào, bạn có khỏe không?");
    const response = result.response.text();

    return NextResponse.json({
      success: true,
      apiVersion: "v1 (forced)",
      response
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: error?.message || "Error",
      fullError: error
    }, { status: 500 });
  }
}
