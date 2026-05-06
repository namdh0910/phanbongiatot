import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Pathology from '@/lib/models/Pathology';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const pathologies = await Pathology.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ pathologies });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const pathology = await Pathology.create(body);
    return NextResponse.json(pathology, { status: 201 });
  } catch (error: any) {
    console.error("POST Solution Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
