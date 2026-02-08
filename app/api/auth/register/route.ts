import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const client = await connectToDatabase();
    const db = client.db();
    const users = db.collection('users');

    const existing = await users.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Complete list of subjects - only RESTANTES (53 total)
    const defaultMaterias = [
      // Primer semestre - Restantes (8)
      { id: '1-1', nombre: 'Orientación Institucional', semestre: 1, estado: 'restante' },
      { id: '1-2', nombre: 'Educación Física', semestre: 1, estado: 'restante' },
      { id: '1-3', nombre: 'Int A La Filosofía', semestre: 1, estado: 'restante' },
      { id: '1-4', nombre: 'Tecnica De Investigación Y Est', semestre: 1, estado: 'restante' },
      { id: '1-5', nombre: 'Ingles Elemental I', semestre: 1, estado: 'restante' },
      { id: '1-6', nombre: 'Frances Elemental I', semestre: 1, estado: 'restante' },
      { id: '1-7', nombre: 'Lengua Española Básica I', semestre: 1, estado: 'restante' },
      { id: '1-8', nombre: 'Int A Las Ciencias Sociales', semestre: 1, estado: 'restante' },

      // Segundo semestre - Restantes (6)
      { id: '2-1', nombre: 'Biología Básica', semestre: 2, estado: 'restante' },
      { id: '2-2', nombre: 'Física Básica', semestre: 2, estado: 'restante' },
      { id: '2-3', nombre: 'Fund De His Social Dominicana', semestre: 2, estado: 'restante' },
      { id: '2-4', nombre: 'Inglés Elemental II', semestre: 2, estado: 'restante' },
      { id: '2-5', nombre: 'Frances Elemental II', semestre: 2, estado: 'restante' },
      { id: '2-6', nombre: 'Lengua Española Básica II', semestre: 2, estado: 'restante' },

      // Tercer semestre - Restantes (7)
      { id: '3-1', nombre: 'Historia De La Cultura Universal', semestre: 3, estado: 'restante' },
      { id: '3-2', nombre: 'Inglés Intermedio I', semestre: 3, estado: 'restante' },
      { id: '3-3', nombre: 'Francés Intermedio I', semestre: 3, estado: 'restante' },
      { id: '3-4', nombre: 'Lengua Española III', semestre: 3, estado: 'restante' },
      { id: '3-5', nombre: 'Int A La Linguistica General', semestre: 3, estado: 'restante' },
      { id: '3-6', nombre: 'Matemática Básica', semestre: 3, estado: 'restante' },
      { id: '3-7', nombre: 'Química Básica', semestre: 3, estado: 'restante' },

      // Cuarto semestre - Restantes (6)
      { id: '4-1', nombre: 'His De La Cultura Dom I', semestre: 4, estado: 'restante' },
      { id: '4-2', nombre: 'Ingles Intermedio II', semestre: 4, estado: 'restante' },
      { id: '4-3', nombre: 'Frances Intermedio II', semestre: 4, estado: 'restante' },
      { id: '4-4', nombre: 'Morfología Y Sintaxis I', semestre: 4, estado: 'restante' },
      { id: '4-5', nombre: 'Int A La Educación', semestre: 4, estado: 'restante' },
      { id: '4-6', nombre: 'Int A La Psicología', semestre: 4, estado: 'restante' },

      // Quinto semestre - Restantes (6)
      { id: '5-1', nombre: 'Metodología De La Inv Cientifica', semestre: 5, estado: 'restante' },
      { id: '5-2', nombre: 'Gramática Inglesa', semestre: 5, estado: 'restante' },
      { id: '5-3', nombre: 'Inglés Intermedio III', semestre: 5, estado: 'restante' },
      { id: '5-4', nombre: 'Fonética Y Fonología', semestre: 5, estado: 'restante' },
      { id: '5-5', nombre: 'Literatura Dominicana I', semestre: 5, estado: 'restante' },
      { id: '5-6', nombre: 'His De La Lengua Española I', semestre: 5, estado: 'restante' },

      // Sexto semestre - Restantes (5)
      { id: '6-1', nombre: 'Inglés Avanzado I', semestre: 6, estado: 'restante' },
      { id: '6-2', nombre: 'Composición Inglesa I', semestre: 6, estado: 'restante' },
      { id: '6-3', nombre: 'Fonética Inglesa', semestre: 6, estado: 'restante' },
      { id: '6-4', nombre: 'Civilización Norteamericana E Inglesa', semestre: 6, estado: 'restante' },
      { id: '6-5', nombre: 'Adquisición De Una Lengua Extranjera', semestre: 6, estado: 'restante' },

      // Septimo semestre - Restantes (4)
      { id: '7-1', nombre: 'Estilística Inglesa', semestre: 7, estado: 'restante' },
      { id: '7-2', nombre: 'Int Lit Paises Angloparlantes', semestre: 7, estado: 'restante' },
      { id: '7-3', nombre: 'Inglés Avanzado II', semestre: 7, estado: 'restante' },
      { id: '7-4', nombre: 'Met De La Enseñanza Del Inglés', semestre: 7, estado: 'restante' },

      // Octavo semestre - Restantes (7)
      { id: '8-1', nombre: 'Literatura Inglesa Siglo XX', semestre: 8, estado: 'restante' },
      { id: '8-2', nombre: 'Inglés Avanzado III', semestre: 8, estado: 'restante' },
      { id: '8-3', nombre: 'Historia Del Idioma Inglés', semestre: 8, estado: 'restante' },
      { id: '8-4', nombre: 'Lit Norteamericana Siglo XX', semestre: 8, estado: 'restante' },
      { id: '8-5', nombre: 'Seminario De Tesis En Inglés', semestre: 8, estado: 'restante' },
      { id: '8-6', nombre: 'Asignatura Optativa de Idiomas', semestre: 8, estado: 'restante' },
      { id: '8-7', nombre: 'Optativa de Otro Departamento', semestre: 8, estado: 'restante' },
    ];

    const res = await users.insertOne({
      email: email.toLowerCase(),
      password: hashed,
      materias: defaultMaterias,
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true, id: res.insertedId });
  } catch (err: any) {
    console.error('Register error:', err);
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 });
  }
}
