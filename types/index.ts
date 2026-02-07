export type EstadoMateria = 'restante' | 'en_curso' | 'cursada';
export type Tab = 'restantes' | 'cursadas' | 'en_curso';

export interface Materia {
  id: string;
  nombre: string;
  semestre: number;
  estado: EstadoMateria;
}
