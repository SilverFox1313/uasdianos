import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const secret = process.env.JWT_SECRET || 'your_secret_key';
const key = new TextEncoder().encode(secret);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No token' }, { status: 401 });
    }

    const verified = await jwtVerify(token, key);
    return NextResponse.json({ email: verified.payload.email });
  } catch (error) {
    console.error('User info error:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
