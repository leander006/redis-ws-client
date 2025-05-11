import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prismaClient from '@/app/lib/prisma';
import { generateToken } from '@/app/lib/jwt';


export async function POST(req: Request) {
  const { name, password } = await req.json();

  if (!name || !password) {
    return NextResponse.json({ error: 'Name and password are required' }, { status: 400 });
  }

  const user = await prismaClient.user.findUnique({ where: { name } });
  console.log("users ",user);
  
  if (!user || !(await bcrypt.compare(password, user.password || ''))) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = generateToken({ id: user.id });

  return NextResponse.json({ message: 'Login successful', user,token });
}
