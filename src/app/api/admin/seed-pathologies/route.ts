import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Pathology from '@/lib/models/Pathology';
import pathologiesData from '@/data/pathologies.json';

export async function GET() {
  try {
    await dbConnect();

    for (const pathologyData of pathologiesData) {
      await Pathology.findOneAndUpdate(
        { slug: pathologyData.slug },
        pathologyData,
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ message: `Successfully seeded ${pathologiesData.length} pathologies` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
