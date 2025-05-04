import prismaClient from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { roomId: string } }) {
  const { roomId } = params;
  const room = await prismaClient.room.findUnique({ where: { id: roomId } });
  if (!room) {
    return new Response('Room not found', { status: 404 });
  }
  return NextResponse.json(room,{ status: 200 });
}
