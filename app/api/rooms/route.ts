// app/api/rooms/route.ts
import prismaClient from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const rooms = await prismaClient.room.findMany();
  return NextResponse.json(rooms);
}
