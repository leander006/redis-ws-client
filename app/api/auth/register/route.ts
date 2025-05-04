import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prismaClient from '@/app/lib/prisma';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Name and Email and password are required' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prismaClient.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({ message: 'User registered successfully', user },{status: 201});
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
