import type { PokemonDetail } from '../../types/pokemon';

interface Props {
  pokemon: PokemonDetail | null;
  cargando: boolean;
  esFavorito: boolean;
  onToggleFavorito: () => void;
}

export default function DetallePokemon({ pokemon, cargando, esFavorito, onToggleFavorito }: Props) {
  if (cargando) {
    return (
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center min-h-[420px]">
        <p className="text-slate-400 text-sm">Cargando Pokémon...</p>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center min-h-[420px]">
        <p className="text-slate-400 text-sm">Selecciona un Pokémon de la lista</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5">
        <div className="flex items-center justify-between text-blue-100 text-sm font-medium">
          <span>#{String(pokemon.id).padStart(3, '0')}</span>
          <div className="flex items-center gap-2">
            <span className="bg-white/15 border border-white/25 rounded-full px-3 py-1 text-xs">
              {pokemon.baseExperience} XP
            </span>
            <button
              onClick={onToggleFavorito}
              aria-label={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              className="bg-white/15 border border-white/25 rounded-full px-3 py-1 text-xs text-white hover:bg-white/25 transition-colors cursor-pointer"
            >
              {esFavorito ? '★ En favoritos' : '☆ Agregar a favoritos'}
            </button>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mt-1">{pokemon.name}</h2>
        <div className="flex gap-2 mt-3">
          {pokemon.types.map((tipo) => (
            <span
              key={tipo}
              className="bg-white/15 border border-white/25 text-white text-xs font-medium rounded-full px-3 py-1"
            >
              {tipo}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-center">
          <div className="w-40 h-40 rounded-full bg-slate-100 flex items-center justify-center">
            {pokemon.image ? (
              <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32 object-contain" />
            ) : (
              <span className="text-slate-400 text-xs">Sin imagen</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <InfoBox label="Altura" valor={`${pokemon.height} m`} />
          <InfoBox label="Peso" valor={`${pokemon.weight} kg`} />
          <InfoBox label="Experiencia" valor={pokemon.baseExperience} />
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-slate-800 mb-2">Habilidades</h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((habilidad) => (
              <span
                key={habilidad}
                className="bg-slate-100 text-slate-700 text-sm rounded-full px-3 py-1"
              >
                {habilidad}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-slate-800 mb-3">Estadísticas</h3>
          <div className="flex flex-col gap-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">{stat.name}</span>
                  <span className="text-slate-500">{stat.value}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${Math.min(100, stat.value)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, valor }: { label: string; valor: string | number }) {
  return (
    <div className="border border-slate-200 rounded-lg py-3 text-center">
      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">{label}</p>
      <p className="text-slate-800 font-semibold mt-1">{valor}</p>
    </div>
  );
}