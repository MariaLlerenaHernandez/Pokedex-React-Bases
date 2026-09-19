import type { PokemonDetail } from '../../types/pokemon';

interface Props {
  pokemones: PokemonDetail[];
  total: number;
  estadistica: string;
  seleccionado: number | null;
  favoritos: number[];
  onSeleccionar: (pokemon: PokemonDetail) => void;
  onToggleFavorito: (id: number) => void;
  cargando: boolean;
}

export default function ListaPokemon({
  pokemones,
  total,
  estadistica,
  seleccionado,
  favoritos,
  onSeleccionar,
  onToggleFavorito,
  cargando,
}: Props) {
  return (
    <div className="w-full sm:w-80 shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-slate-800">Pokémon</h2>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 rounded-full px-2 py-0.5">
          {pokemones.length} / {total}
        </span>
      </div>

      <div className="overflow-y-auto max-h-[65vh] pr-1 flex flex-col gap-1">
        {cargando && (
          <p className="text-sm text-slate-400 py-4 text-center">Cargando los 151 Pokémon...</p>
        )}

        {!cargando && pokemones.length === 0 && (
          <p className="text-sm text-slate-400 py-4 text-center">Sin resultados</p>
        )}

        {pokemones.map((pokemon) => {
          const activo = pokemon.id === seleccionado;
          const esFavorito = favoritos.includes(pokemon.id);
          const valor = pokemon.stats.find((s) => s.name === estadistica)?.value ?? 0;
          return (
            <div
              key={pokemon.id}
              className={`flex items-center rounded-lg transition-colors ${
                activo ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <button
                onClick={() => onSeleccionar(pokemon)}
                className="flex-1 min-w-0 flex items-center justify-between px-3 py-2 text-sm font-medium capitalize cursor-pointer"
              >
                <span className="truncate">{pokemon.name}</span>
                <span
                  className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                    activo ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {valor}
                </span>
              </button>

              <button
                onClick={() => onToggleFavorito(pokemon.id)}
                aria-label={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                className={`px-2 text-lg leading-none cursor-pointer ${
                  esFavorito
                    ? 'text-amber-400'
                    : activo
                      ? 'text-blue-100'
                      : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                {esFavorito ? '★' : '☆'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}