interface Props {
  onSeleccionar: (vista: 'usuario' | 'pokedex') => void;
}

export default function Menu({ onSeleccionar }: Props) {
  return (
    <div className="p-8 bg-slate-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8 text-slate-800">Práctica 02 · Fundamentos de React</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => onSeleccionar('usuario')}
          className="w-64 bg-white border border-slate-200 rounded-xl shadow-sm p-6 text-left hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
        >
          <h2 className="font-semibold text-slate-800">Demo Fetch Usuario</h2>
          <p className="text-sm text-slate-500 mt-1">Consumo básico de una API con useState.</p>
        </button>
        <button
          onClick={() => onSeleccionar('pokedex')}
          className="w-64 bg-white border border-slate-200 rounded-xl shadow-sm p-6 text-left hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
        >
          <h2 className="font-semibold text-slate-800">Pokédex</h2>
          <p className="text-sm text-slate-500 mt-1">Listado y detalle de los 151 Pokémon originales.</p>
        </button>
      </div>
    </div>
  );
}
