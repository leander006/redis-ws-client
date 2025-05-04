// app/api/rooms/[roomId]/messages/route.ts
import prismaClient from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { roomId: string } }) {
  const messages = await prismaClient.message.findMany({
    where: { roomId: params.roomId },
    include: { user: true },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(messages);
}

export async function POST(req: Request, { params }: { params: { roomId: string } }) {
  const { content, userId } = await req.json();

  const message = await prismaClient.message.create({
    data: { content, roomId: params.roomId, userId },
  });

  return NextResponse.json(message);
}
