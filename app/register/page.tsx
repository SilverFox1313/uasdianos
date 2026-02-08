'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Registro</h2>

        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

        <label className="block mb-2 text-sm">Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded mb-4" type="email" required />

        <label className="block mb-2 text-sm">Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded mb-4" type="password" required minLength={6} />

        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded disabled:bg-gray-400">{loading ? 'Creando...' : 'Crear cuenta'}</button>

        <div className="mt-3 text-sm text-center">
          ¿Ya tienes cuenta? <a href="/login" className="text-blue-600">Entrar</a>
        </div>
      </form>
    </main>
  );
}
