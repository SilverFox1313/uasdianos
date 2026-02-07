'use client';

import { useState } from 'react';
import MateriasRestantes from '@/components/MateriasRestantes';
import MateriasCursadas from '@/components/MateriasCursadas';
import MateriasEnCurso from '@/components/MateriasEnCurso';
import type { Materia, Tab } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('restantes');
  
  const [materias, setMaterias] = useState<Materia[]>([
    // Primer semestre - Restantes
    { id: '1-1', nombre: 'Orientación Institucional', semestre: 1, estado: 'restante' },
    { id: '1-2', nombre: 'Educación Física', semestre: 1, estado: 'restante' },
    { id: '1-3', nombre: 'Int A La Filosofía', semestre: 1, estado: 'restante' },
    { id: '1-4', nombre: 'Tecnica De Investigación Y Est', semestre: 1, estado: 'restante' },
    { id: '1-5', nombre: 'Ingles Elemental I', semestre: 1, estado: 'restante' },
    { id: '1-6', nombre: 'Frances Elemental I', semestre: 1, estado: 'restante' },
    { id: '1-7', nombre: 'Lengua Española Básica I', semestre: 1, estado: 'restante' },
    { id: '1-8', nombre: 'Int A Las Ciencias Sociales', semestre: 1, estado: 'restante' },
    
    // Segundo semestre - Restantes
    { id: '2-1', nombre: 'Biología Básica', semestre: 2, estado: 'restante' },
    { id: '2-2', nombre: 'Física Básica', semestre: 2, estado: 'restante' },
    { id: '2-3', nombre: 'Fund De His Social Dominicana', semestre: 2, estado: 'restante' },
    { id: '2-4', nombre: 'Inglés Elemental II', semestre: 2, estado: 'restante' },
    { id: '2-5', nombre: 'Frances Elemental II', semestre: 2, estado: 'restante' },
    { id: '2-6', nombre: 'Lengua Española Básica II', semestre: 2, estado: 'restante' },
    
    // Tercer semestre - Restantes
    { id: '3-1', nombre: 'Historia De La Cultura Universal', semestre: 3, estado: 'restante' },
    { id: '3-2', nombre: 'Inglés Intermedio I', semestre: 3, estado: 'restante' },
    { id: '3-3', nombre: 'Francés Intermedio I', semestre: 3, estado: 'restante' },
    { id: '3-4', nombre: 'Lengua Española III', semestre: 3, estado: 'restante' },
    { id: '3-5', nombre: 'Int A La Linguistica General', semestre: 3, estado: 'restante' },
    { id: '3-6', nombre: 'Matemática Básica', semestre: 3, estado: 'restante' },
    { id: '3-7', nombre: 'Química Básica', semestre: 3, estado: 'restante' },
    
    // Cuarto semestre - Restantes
    { id: '4-1', nombre: 'His De La Cultura Dom I', semestre: 4, estado: 'restante' },
    { id: '4-2', nombre: 'Ingles Intermedio II', semestre: 4, estado: 'restante' },
    { id: '4-3', nombre: 'Frances Intermedio II', semestre: 4, estado: 'restante' },
    { id: '4-4', nombre: 'Morfología Y Sintaxis I', semestre: 4, estado: 'restante' },
    { id: '4-5', nombre: 'Int A La Educación', semestre: 4, estado: 'restante' },
    { id: '4-6', nombre: 'Int A La Psicología', semestre: 4, estado: 'restante' },
    
    // Quinto semestre - Restantes
    { id: '5-1', nombre: 'Metodología De La Inv Cientifica', semestre: 5, estado: 'restante' },
    { id: '5-2', nombre: 'Gramática Inglesa', semestre: 5, estado: 'restante' },
    { id: '5-3', nombre: 'Inglés Intermedio III', semestre: 5, estado: 'restante' },
    { id: '5-4', nombre: 'Fonética Y Fonología', semestre: 5, estado: 'restante' },
    { id: '5-5', nombre: 'Literatura Dominicana I', semestre: 5, estado: 'restante' },
    { id: '5-6', nombre: 'His De La Lengua Española I', semestre: 5, estado: 'restante' },
    
    // Sexto semestre - Restantes
    { id: '6-1', nombre: 'Inglés Avanzado I', semestre: 6, estado: 'restante' },
    { id: '6-2', nombre: 'Composición Inglesa I', semestre: 6, estado: 'restante' },
    { id: '6-3', nombre: 'Fonética Inglesa', semestre: 6, estado: 'restante' },
    { id: '6-4', nombre: 'Civilización Norteamericana E Inglesa', semestre: 6, estado: 'restante' },
    { id: '6-5', nombre: 'Adquisición De Una Lengua Extranjera', semestre: 6, estado: 'restante' },
    
    // Septimo semestre - Restante
    { id: '7-1', nombre: 'Estilística Inglesa', semestre: 7, estado: 'restante' },
    { id: '7-2', nombre: 'Int Lit Paises Angloparlantes', semestre: 7, estado: 'restante' },
    { id: '7-3', nombre: 'Inglés Avanzado II', semestre: 7, estado: 'restante' },
    { id: '7-4', nombre: 'Met De La Enseñanza Del Inglés', semestre: 7, estado: 'restante' },
    
    // Octavo semestre - Restante
    { id: '8-1', nombre: 'Literatura Inglesa Siglo XX', semestre: 8, estado: 'restante' },
    { id: '8-2', nombre: 'Inglés Avanzado III', semestre: 8, estado: 'restante' },
    { id: '8-3', nombre: 'Historia Del Idioma Inglés', semestre: 8, estado: 'restante' },
    { id: '8-4', nombre: 'Lit Norteamericana Siglo XX', semestre: 8, estado: 'restante' },
    { id: '8-5', nombre: 'Seminario De Tesis En Inglés', semestre: 8, estado: 'restante' },
    { id: '8-6', nombre: 'Asignatura Optativa de Idiomas', semestre: 8, estado: 'restante' },
    { id: '8-7', nombre: 'Optativa de Otro Departamento', semestre: 8, estado: 'restante' },
  ]);

  const handleCambiarEstado = (id: string, nuevoEstado: 'restante' | 'en_curso' | 'cursada') => {
    setMaterias(materias.map(m => 
      m.id === id ? { ...m, estado: nuevoEstado } : m
    ));
  };

  const countRestantes = materias.filter(m => m.estado === 'restante').length;
  const countCursadas = materias.filter(m => m.estado === 'cursada').length;
  const countEnCurso = materias.filter(m => m.estado === 'en_curso').length;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          Licenciatura en Lenguas Modernas (Inglés)
        </h1>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-8 sm:border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('restantes')}
            className={`py-3 px-4 sm:py-4 sm:px-6 font-semibold text-sm sm:text-base lg:text-lg transition-colors whitespace-nowrap sm:border-b-4 border-b-4 sm:border-b-0 ${
              activeTab === 'restantes'
                ? 'border-blue-600 text-blue-600 sm:border-b-4 sm:border-b-blue-600'
                : 'border-gray-200 text-gray-600 hover:text-gray-900'
            }`}
          >
            Restantes ({countRestantes})
          </button>
          <button
            onClick={() => setActiveTab('cursadas')}
            className={`py-3 px-4 sm:py-4 sm:px-6 font-semibold text-sm sm:text-base lg:text-lg transition-colors whitespace-nowrap sm:border-b-4 border-b-4 sm:border-b-0 ${
              activeTab === 'cursadas'
                ? 'border-green-600 text-green-600 sm:border-b-4 sm:border-b-green-600'
                : 'border-gray-200 text-gray-600 hover:text-gray-900'
            }`}
          >
            Cursadas ({countCursadas})
          </button>
          <button
            onClick={() => setActiveTab('en_curso')}
            className={`py-3 px-4 sm:py-4 sm:px-6 font-semibold text-sm sm:text-base lg:text-lg transition-colors whitespace-nowrap sm:border-b-4 border-b-4 sm:border-b-0 ${
              activeTab === 'en_curso'
                ? 'border-yellow-600 text-yellow-600 sm:border-b-4 sm:border-b-yellow-600'
                : 'border-gray-200 text-gray-600 hover:text-gray-900'
            }`}
          >
            En Curso ({countEnCurso})
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'restantes' && (
            <MateriasRestantes materias={materias} onCambiarEstado={handleCambiarEstado} />
          )}
          {activeTab === 'cursadas' && (
            <MateriasCursadas materias={materias} onCambiarEstado={handleCambiarEstado} />
          )}
          {activeTab === 'en_curso' && (
            <MateriasEnCurso materias={materias} onCambiarEstado={handleCambiarEstado} />
          )}
        </div>
      </div>
    </main>
  );
}
