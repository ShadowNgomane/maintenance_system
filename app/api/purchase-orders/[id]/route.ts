import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import PurchaseOrder from '@/app/models/PurchaseOrder';

// GET - Fetch single purchase order
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const purchaseOrder = await PurchaseOrder.findById(params.id);
    if (!purchaseOrder) {
      return NextResponse.json({ error: 'Purchase order not found' }, { status: 404 });
    }
    return NextResponse.json(purchaseOrder);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch purchase order' }, { status: 500 });
  }
}

// PUT - Update purchase order
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const data = await request.json();
    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(params.id, data, { new: true });
    if (!purchaseOrder) {
      return NextResponse.json({ error: 'Purchase order not found' }, { status: 404 });
    }
    return NextResponse.json(purchaseOrder);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update purchase order' }, { status: 500 });
  }
}

// DELETE - Delete purchase order
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const purchaseOrder = await PurchaseOrder.findByIdAndDelete(params.id);
    if (!purchaseOrder) {
      return NextResponse.json({ error: 'Purchase order not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Purchase order deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete purchase order' }, { status: 500 });
  }
} 