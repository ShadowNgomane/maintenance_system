import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import PreventiveMaintenance from '@/app/models/PreventiveMaintenance';

// GET - Fetch single Preventive Maintenance item
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const maintenanceItem = await PreventiveMaintenance.findById(params.id);
    if (!maintenanceItem) {
      return NextResponse.json({ error: 'Preventive Maintenance item not found' }, { status: 404 });
    }
    return NextResponse.json(maintenanceItem);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Preventive Maintenance item' }, { status: 500 });
  }
}

// PUT - Update Preventive Maintenance item
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const data = await request.json();
    const maintenanceItem = await PreventiveMaintenance.findByIdAndUpdate(params.id, data, { new: true });
    if (!maintenanceItem) {
      return NextResponse.json({ error: 'Preventive Maintenance item not found' }, { status: 404 });
    }
    return NextResponse.json(maintenanceItem);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update Preventive Maintenance item' }, { status: 500 });
  }
}

// DELETE - Delete Preventive Maintenance item
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const maintenanceItem = await PreventiveMaintenance.findByIdAndDelete(params.id);
    if (!maintenanceItem) {
      return NextResponse.json({ error: 'Preventive Maintenance item not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Preventive Maintenance item deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete Preventive Maintenance item' }, { status: 500 });
  }
} 