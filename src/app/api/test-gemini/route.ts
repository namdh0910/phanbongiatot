import { NextRequest, NextResponse } from 'next/server';
import { generateAIContent } from "@/lib/gemini";

export async function GET(req: NextRequest) {
  try {
    const result = await generateAIContent("Xin chào, bạn có khỏe không?");

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error,
        details: result.details
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      modelUsed: result.modelUsed,
      response: result.text
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: error?.message || "Error"
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const result = await generateAIContent(prompt || "Xin chào");

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      modelUsed: result.modelUsed,
      response: result.text
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || "Error"
    }, { status: 500 });
  }
}
