interface Props {
  onSeleccionar: (vista: 'usuario' | 'pokedex') => void;
}

const FONDO_POKEBOLA = [
  'radial-gradient(circle at 50% 50%, #ffffff 0 26px, #1f1f1f 26px 31px, #ffffff 31px 40px, #1f1f1f 40px 54px, transparent 54px)',
  'linear-gradient(135deg, #ffffff 0, #ffffff calc(50% - 22px), #1f1f1f calc(50% - 22px), #1f1f1f calc(50% + 22px), #e3350d calc(50% + 22px), #e3350d 100%)',
].join(', ');

export default function Menu({ onSeleccionar }: Props) {
  return (
    <div
      className="p-8 min-h-screen flex flex-col items-center justify-center"
      style={{ background: FONDO_POKEBOLA }}
    >
      <h1 className="text-2xl font-bold mb-8 text-slate-800 bg-white rounded-full px-6 py-2 shadow-md text-center">
        Práctica 02 · Fundamentos de React
      </h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => onSeleccionar('usuario')}
          className="w-64 bg-white border border-slate-200 rounded-xl shadow-md p-6 text-left hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
        >
          <h2 className="font-semibold text-slate-800">Demo Fetch Usuario</h2>
          <p className="text-sm text-slate-500 mt-1">Consumo básico de una API con useState.</p>
        </button>
        <button
          onClick={() => onSeleccionar('pokedex')}
          className="w-64 bg-white border border-slate-200 rounded-xl shadow-md p-6 text-left hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
        >
          <h2 className="font-semibold text-slate-800">Pokédex</h2>
          <p className="text-sm text-slate-500 mt-1">Listado y detalle de los 151 Pokémon originales.</p>
        </button>
      </div>
    </div>
  );
}