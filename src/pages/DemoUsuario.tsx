import { useState } from 'react';
import TarjetaUsuario from '../components/TarjetaUsuario';

interface Usuario {
  name: string;
  email: string;
}

interface Props {
  onRegresar: () => void;
}

export default function DemoUsuario({ onRegresar }: Props) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);

  const obtenerDatos = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const datos = await respuesta.json();
      setUsuario(datos);
    } catch (error) {
      console.error('Error al consumir la API', error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <button
        onClick={onRegresar}
        className="mb-4 border border-slate-300 bg-white text-slate-600 text-sm font-medium rounded-lg px-4 py-2 hover:bg-slate-50 transition-colors cursor-pointer"
      >
        ← Regresar
      </button>
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Fundamentos de React</h1>
      <button
        onClick={obtenerDatos}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-all cursor-pointer"
      >
        {cargando ? 'Consultando API...' : 'Obtener Usuario'}
      </button>
      {usuario && <TarjetaUsuario nombre={usuario.name} correo={usuario.email} />}
    </div>
  );
}
