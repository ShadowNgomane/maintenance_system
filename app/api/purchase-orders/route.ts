import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import PurchaseOrder from '@/app/models/PurchaseOrder';

// GET - Fetch all purchase orders
export async function GET() {
  try {
    await dbConnect();
    const purchaseOrders = await PurchaseOrder.find({});
    return NextResponse.json(purchaseOrders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch purchase orders' }, { status: 500 });
  }
}

// POST - Create new purchase order
export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const purchaseOrder = await PurchaseOrder.create(data);
    return NextResponse.json(purchaseOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create purchase order' }, { status: 500 });
  }
} 