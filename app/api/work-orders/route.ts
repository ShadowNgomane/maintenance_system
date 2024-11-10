import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import WorkOrder from '@/app/models/WorkOrder';

// GET - Fetch all work orders
export async function GET() {
  try {
    await dbConnect();
    const workOrders = await WorkOrder.find({});
    return NextResponse.json(workOrders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch work orders' }, { status: 500 });
  }
}

// POST - Create new work order
export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const workOrder = await WorkOrder.create(data);
    return NextResponse.json(workOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create work order' }, { status: 500 });
  }
} 