'use client';

import { useState } from 'react';
import type { Materia } from '@/types';

interface MateriasRestantesProps {
  materias: Materia[];
  onCambiarEstado: (id: string, nuevoEstado: 'restante' | 'en_curso' | 'cursada') => void;
}

export default function MateriasRestantes({ materias, onCambiarEstado }: MateriasRestantesProps) {
  const [expandedSemestres, setExpandedSemestres] = useState<Set<number>>(new Set([1]));

  const restantes = materias.filter(m => m.estado === 'restante');
  const semestreUnicos = [...new Set(restantes.map(m => m.semestre))].sort((a, b) => a - b);

  const toggleSemestre = (semestre: number) => {
    const newExpanded = new Set(expandedSemestres);
    if (newExpanded.has(semestre)) {
      newExpanded.delete(semestre);
    } else {
      newExpanded.add(semestre);
    }
    setExpandedSemestres(newExpanded);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {semestreUnicos.length === 0 ? (
        <div className="p-6 sm:p-8 text-center bg-blue-50 rounded-lg">
          <p className="text-gray-600 text-base sm:text-lg">¡Felicidades! No hay materias restantes.</p>
        </div>
      ) : (
        semestreUnicos.map(semestre => {
          const materiasSemestre = restantes.filter(m => m.semestre === semestre);
          const isExpanded = expandedSemestres.has(semestre);

          return (
            <div key={semestre} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => toggleSemestre(semestre)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center gap-3 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-semibold text-base sm:text-lg text-gray-900 text-left">
                  Semestre {semestre} ({materiasSemestre.length})
                </h3>
                <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {isExpanded && (
                <div className="divide-y divide-gray-200">
                  {materiasSemestre.map(materia => (
                    <div key={materia.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm sm:text-base break-words">{materia.nombre}</p>
                      </div>
                      <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => onCambiarEstado(materia.id, 'en_curso')}
                          className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium text-sm rounded-md transition-colors"
                        >
                          En Curso
                        </button>
                        <button
                          onClick={() => onCambiarEstado(materia.id, 'cursada')}
                          className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm rounded-md transition-colors"
                        >
                          Completar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
