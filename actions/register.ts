'use server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function register(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    throw new Error('Email is already taken. Pleast try another');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await db.user.create({
    data: {
      email,
      hashedPassword,
    },
  });
}
