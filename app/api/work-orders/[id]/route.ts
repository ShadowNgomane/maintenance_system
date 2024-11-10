import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import WorkOrder from '@/app/models/WorkOrder';

// GET - Fetch single work order
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const workOrder = await WorkOrder.findById(params.id);
    if (!workOrder) {
      return NextResponse.json({ error: 'Work order not found' }, { status: 404 });
    }
    return NextResponse.json(workOrder);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch work order' }, { status: 500 });
  }
}

// PUT - Update work order
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const data = await request.json();
    const workOrder = await WorkOrder.findByIdAndUpdate(params.id, data, { new: true });
    if (!workOrder) {
      return NextResponse.json({ error: 'Work order not found' }, { status: 404 });
    }
    return NextResponse.json(workOrder);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update work order' }, { status: 500 });
  }
}

// DELETE - Delete work order
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const workOrder = await WorkOrder.findByIdAndDelete(params.id);
    if (!workOrder) {
      return NextResponse.json({ error: 'Work order not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Work order deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete work order' }, { status: 500 });
  }
} 