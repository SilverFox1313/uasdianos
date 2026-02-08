'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MateriasRestantes from '@/components/MateriasRestantes';
import MateriasCursadas from '@/components/MateriasCursadas';
import MateriasEnCurso from '@/components/MateriasEnCurso';
import Navbar from '@/components/Navbar';
import type { Materia, Tab } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('restantes');
  const router = useRouter();
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch('/api/materias');
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      const data = await res.json();
      setMaterias(data?.materias || []);
      setLoading(false);
    }
    load();
  }, [router]);

  const handleCambiarEstado = async (id: string, nuevoEstado: 'restante' | 'en_curso' | 'cursada') => {
    // optimistic update
    setMaterias(prev => prev.map(m => (m.id === id ? { ...m, estado: nuevoEstado } : m)));
    const res = await fetch('/api/materias', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, nuevoEstado }),
    });
    if (res.ok) {
      const data = await res.json();
      setMaterias(data.materias || []);
    } else if (res.status === 401) {
      router.push('/login');
    }
  };

  const countRestantes = materias.filter(m => m.estado === 'restante').length;
  const countCursadas = materias.filter(m => m.estado === 'cursada').length;
  const countEnCurso = materias.filter(m => m.estado === 'en_curso').length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:p-6 lg:p-8">
          <h1 className="text-3xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 bg-linear-to-r from-indigo-700 via-blue-500 to-blue-400 bg-clip-text text-transparent">
            Licenciatura en Lenguas Modernas (Inglés)
          </h1>

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-8 sm:border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('restantes')}
              className={`py-3 px-4 sm:py-4 sm:px-6 font-semibold text-sm sm:text-base lg:text-lg transition-colors whitespace-nowrap sm:border-b-4 border-b-4 sm:border-b-0 ${activeTab === 'restantes'
                  ? 'border-blue-600 text-blue-600 sm:border-b-4 sm:border-b-blue-600'
                  : 'border-gray-200 text-gray-600 hover:text-gray-900'
                }`}
            >
              Restantes ({countRestantes})
            </button>
            <button
              onClick={() => setActiveTab('cursadas')}
              className={`py-3 px-4 sm:py-4 sm:px-6 font-semibold text-sm sm:text-base lg:text-lg transition-colors whitespace-nowrap sm:border-b-4 border-b-4 sm:border-b-0 ${activeTab === 'cursadas'
                  ? 'border-green-600 text-green-600 sm:border-b-4 sm:border-b-green-600'
                  : 'border-gray-200 text-gray-600 hover:text-gray-900'
                }`}
            >
              Cursadas ({countCursadas})
            </button>
            <button
              onClick={() => setActiveTab('en_curso')}
              className={`py-3 px-4 sm:py-4 sm:px-6 font-semibold text-sm sm:text-base lg:text-lg transition-colors whitespace-nowrap sm:border-b-4 border-b-4 sm:border-b-0 ${activeTab === 'en_curso'
                  ? 'border-yellow-600 text-yellow-600 sm:border-b-4 sm:border-b-yellow-600'
                  : 'border-gray-200 text-gray-600 hover:text-gray-900'
                }`}
            >
              En Curso ({countEnCurso})
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {loading ? (
              <div className="p-6 text-center text-gray-600">Cargando materias...</div>
            ) : (
              <>
                {activeTab === 'restantes' && (
                  <MateriasRestantes materias={materias} onCambiarEstado={handleCambiarEstado} />
                )}
                {activeTab === 'cursadas' && (
                  <MateriasCursadas materias={materias} onCambiarEstado={handleCambiarEstado} />
                )}
                {activeTab === 'en_curso' && (
                  <MateriasEnCurso materias={materias} onCambiarEstado={handleCambiarEstado} />
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
