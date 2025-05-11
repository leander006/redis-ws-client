// app/api/rooms/[roomId]/messages/route.ts
import prismaClient from '@/app/lib/prisma';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(
  req: NextApiRequest,
  context: { params: { roomId: string } }
) {
  try {
    const { params } =  context; // Access context
    const { roomId } = params; // Extract roomId from params
 
    
    if (!roomId || Array.isArray(roomId)) {
      return new Response(JSON.stringify({ error: 'Room ID is required and must be a string' }), {
        status: 400,
      });
    }

    const messages = await prismaClient.message.findMany({
      where: { roomId: roomId },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({messages,status:200});
  } catch (error) {
    console.error('Error fetching messages:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch messages' }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: { params: { roomId: string } }) {
  const { content, userId } = await req.json();

  const message = await prismaClient.message.create({
    data: { content, roomId: params.roomId, userId },
  });

  return NextResponse.json(message);
}
