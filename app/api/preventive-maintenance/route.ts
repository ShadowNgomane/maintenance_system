import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import PreventiveMaintenance from '@/app/models/PreventiveMaintenance';

// GET - Fetch all Preventive Maintenance items
export async function GET() {
    try {
      await dbConnect();
      const maintenanceItems = await PreventiveMaintenance.find({});
      return NextResponse.json(maintenanceItems);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch Preventive Maintenance items' }, { status: 500 });
    }
  }
  
  // POST - Create new Preventive Maintenance item
  export async function POST(request: Request) {
    try {
      await dbConnect();
      const data = await request.json();
      const maintenanceItem = await PreventiveMaintenance.create(data);
      return NextResponse.json(maintenanceItem, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create Preventive Maintenance item' }, { status: 500 });
    }
  } 