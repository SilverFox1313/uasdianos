'use client';

import type { Materia } from '@/types';

interface MateriasEnCursoProps {
  materias: Materia[];
  onCambiarEstado: (id: string, nuevoEstado: 'restante' | 'en_curso' | 'cursada') => void;
}

export default function MateriasEnCurso({ materias, onCambiarEstado }: MateriasEnCursoProps) {
  const enCurso = materias.filter(m => m.estado === 'en_curso');

  return (
    <div className="space-y-3 sm:space-y-4">
      {enCurso.length === 0 ? (
        <div className="p-6 sm:p-8 text-center bg-yellow-50 rounded-lg">
          <p className="text-gray-600 text-base sm:text-lg">No hay materias en curso actualmente.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {enCurso.map(materia => (
            <div
              key={materia.id}
              className="p-4 sm:p-6 border-l-4 border-yellow-500 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="mb-4">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <p className="font-semibold text-base sm:text-lg text-gray-900 line-clamp-2">{materia.nombre}</p>
                  <span className="px-2 sm:px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full whitespace-nowrap">
                    En Curso
                  </span>
                </div>
                <p className="text-sm text-gray-500">Semestre {materia.semestre}</p>
              </div>
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => onCambiarEstado(materia.id, 'cursada')}
                  className="flex-1 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm rounded-md transition-colors"
                >
                  Completar
                </button>
                <button
                  onClick={() => onCambiarEstado(materia.id, 'restante')}
                  className="flex-1 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-md transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
