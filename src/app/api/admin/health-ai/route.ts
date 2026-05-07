import { NextRequest, NextResponse } from 'next/server';
import { generateAIContent } from "@/lib/gemini";

export async function GET(req: NextRequest) {
  try {
    const result = await generateAIContent("AI status check");

    if (!result.success) {
      return NextResponse.json({
        status: "error",
        error: result.error
      }, { status: 500 });
    }

    return NextResponse.json({
      status: "success",
      model: result.modelUsed,
      text: result.text
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      error: error?.message || "AI Service Down"
    }, { status: 500 });
  }
}
