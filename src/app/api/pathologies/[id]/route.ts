import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Pathology from '@/lib/models/Pathology';
import { verifyAdmin } from '@/lib/auth';

export async function GET(
  request: Request,
  context: any
) {
  try {
    await dbConnect();
    const params = await context.params;
    const id = params.id;
    
    // Ensure Product model is registered for population
    require('@/lib/models/Product');
    
    const pathology = id.match(/^[0-9a-fA-F]{24}$/) 
      ? await Pathology.findById(id).populate('steps.product')
      : await Pathology.findOne({ slug: id }).populate('steps.product');

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
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const params = await context.params;
    const id = params.id;
    const body = await request.json();
    const pathology = await Pathology.findByIdAndUpdate(id, body, { new: true });
    
    const { revalidatePath } = require('next/cache');
    revalidatePath('/giai-phap');
    revalidatePath(`/giai-phap/${pathology.slug}`);
    revalidatePath('/');
    
    return NextResponse.json(pathology);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: any
) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const params = await context.params;
    const id = params.id;
    await Pathology.findByIdAndDelete(id);

    const { revalidatePath } = require('next/cache');
    revalidatePath('/giai-phap');
    revalidatePath('/');

    return NextResponse.json({ message: 'Deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
