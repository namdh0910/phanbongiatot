import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET(req: NextRequest) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent("Xin chào");
    const response = result.response.text();

    return NextResponse.json({
      success: true,
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
