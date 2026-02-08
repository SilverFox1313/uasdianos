import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

function getTokenFromHeader(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.match(/(?:^|; )token=([^;]+)/);
  return match ? match[1] : null;
}

export async function GET(req: Request) {
  try {
    const token = getTokenFromHeader(req);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload: any = jwt.verify(token, JWT_SECRET);
    const userId = payload.userId;

    const client = await connectToDatabase();
    const db = client.db();
    const users = db.collection('users');

    const user = await users.findOne({ _id: new ObjectId(userId) }, { projection: { materias: 1 } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({ materias: user.materias || [] });
  } catch (err) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(req: Request) {
  try {
    const token = getTokenFromHeader(req);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload: any = jwt.verify(token, JWT_SECRET);
    const userId = payload.userId;

    const { id, nuevoEstado } = await req.json();
    if (!id || !nuevoEstado) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

    const client = await connectToDatabase();
    const db = client.db();
    const users = db.collection('users');

    const res = await users.updateOne(
      { _id: new ObjectId(userId), 'materias.id': id },
      { $set: { 'materias.$.estado': nuevoEstado } }
    );

    if (res.matchedCount === 0) return NextResponse.json({ error: 'Materia not found' }, { status: 404 });

    const user = await users.findOne({ _id: new ObjectId(userId) }, { projection: { materias: 1 } });
    return NextResponse.json({ materias: user?.materias || [] });
  } catch (err) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
