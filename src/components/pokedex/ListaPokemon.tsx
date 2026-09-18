import type { PokemonListItem } from '../../types/pokemon';

interface Props {
  pokemones: PokemonListItem[];
  total: number;
  seleccionado: string | null;
  onSeleccionar: (pokemon: PokemonListItem) => void;
  cargando: boolean;
}

export default function ListaPokemon({
  pokemones,
  total,
  seleccionado,
  onSeleccionar,
  cargando,
}: Props) {
  return (
    <div className="w-full sm:w-80 shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-slate-800">Pokémon</h2>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 rounded-full px-2 py-0.5">
          {total}
        </span>
      </div>

      <div className="overflow-y-auto max-h-[65vh] pr-1 flex flex-col gap-1">
        {cargando && (
          <p className="text-sm text-slate-400 py-4 text-center">Cargando Pokémon...</p>
        )}

        {!cargando && pokemones.length === 0 && (
          <p className="text-sm text-slate-400 py-4 text-center">Sin resultados</p>
        )}

        {pokemones.map((pokemon) => {
          const activo = pokemon.name === seleccionado;
          return (
            <button
              key={pokemon.name}
              onClick={() => onSeleccionar(pokemon)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors cursor-pointer ${
                activo
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{pokemon.name}</span>
              <span className={activo ? 'text-white' : 'text-slate-400'}>→</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
