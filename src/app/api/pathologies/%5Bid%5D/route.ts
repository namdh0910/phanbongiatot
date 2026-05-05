import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Pathology from '@/lib/models/Pathology';

export async function GET(
  request: Request,
  context: any
) {
  try {
    await dbConnect();
    const params = await context.params;
    const id = params.id;
    
    const pathology = id.match(/^[0-9a-fA-F]{24}$/) 
      ? await Pathology.findById(id)
      : await Pathology.findOne({ slug: id });

    if (!pathology) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(pathology);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: any
) {
  try {
    await dbConnect();
    const params = await context.params;
    const id = params.id;
    const body = await request.json();
    const pathology = await Pathology.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(pathology);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
