import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prismaClient from '@/app/lib/prisma';
import { generateToken } from '@/app/lib/jwt';


export async function POST(req: Request) {
  const { id, password } = await req.json();

  if (!id || !password) {
    return NextResponse.json({ error: 'Name and password are required' }, { status: 400 });
  }

  const user = await prismaClient.user.findUnique({ where: { id } });

  if (!user || !(await bcrypt.compare(password, user.password || ''))) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const token = generateToken({ id: user.id });

  return NextResponse.json({ message: 'Login successful', token });
}
