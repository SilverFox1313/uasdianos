import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL;
if (!uri) {
  throw new Error('Please define the DATABASE_URL environment variable inside .env.local');
}

let cached: { client: MongoClient } | undefined;

export async function connectToDatabase() {
  if (cached) {
    return cached.client;
  }

  const client = new MongoClient(uri, {
    tlsAllowInvalidCertificates: process.env.NODE_ENV !== 'production',
  });
  await client.connect();
  cached = { client };
  return client;
}

export function getDb(client: MongoClient, dbName?: string) {
  return client.db(dbName || undefined);
}

