const ICONO_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/small';

const TIPOS: Record<string, { etiqueta: string; color: string; id: number }> = {
  Normal: { etiqueta: 'Normal', color: '#a8a77a', id: 1 },
  Fighting: { etiqueta: 'Lucha', color: '#c22e28', id: 2 },
  Flying: { etiqueta: 'Volador', color: '#a98ff3', id: 3 },
  Poison: { etiqueta: 'Veneno', color: '#a33ea1', id: 4 },
  Ground: { etiqueta: 'Tierra', color: '#e2bf65', id: 5 },
  Rock: { etiqueta: 'Roca', color: '#b6a136', id: 6 },
  Bug: { etiqueta: 'Bicho', color: '#a6b91a', id: 7 },
  Ghost: { etiqueta: 'Fantasma', color: '#735797', id: 8 },
  Steel: { etiqueta: 'Acero', color: '#b7b7ce', id: 9 },
  Fire: { etiqueta: 'Fuego', color: '#ee8130', id: 10 },
  Water: { etiqueta: 'Agua', color: '#6390f0', id: 11 },
  Grass: { etiqueta: 'Planta', color: '#7ac74c', id: 12 },
  Electric: { etiqueta: 'Rayo', color: '#f7d02c', id: 13 },
  Psychic: { etiqueta: 'Psíquico', color: '#f95587', id: 14 },
  Ice: { etiqueta: 'Hielo', color: '#96d9d6', id: 15 },
  Dragon: { etiqueta: 'Dragón', color: '#6f35fc', id: 16 },
  Dark: { etiqueta: 'Siniestro', color: '#705746', id: 17 },
  Fairy: { etiqueta: 'Hada', color: '#d685ad', id: 18 },
};

interface Props {
  tipos: string[];
  seleccionados: string[];
  onToggle: (tipo: string) => void;
  onRestablecer: () => void;
}

export default function FiltroTipo({ tipos, seleccionados, onToggle, onRestablecer }: Props) {
  return (
    <div className="bg-white border border-blue-100 rounded-xl p-3 sm:p-4 mb-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide">
          Tipo de Pokémon
        </p>
        <button
          onClick={onRestablecer}
          className="text-xs font-medium text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg px-3 py-1 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          Restablecer
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {tipos.map((tipo) => {
          const activo = seleccionados.includes(tipo);
          const info = TIPOS[tipo] ?? { etiqueta: tipo, color: '#94a3b8', id: 0 };
          return (
            <button
              key={tipo}
              onClick={() => onToggle(tipo)}
              className={`relative min-w-0 flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-xs font-medium border transition-colors cursor-pointer sm:flex-row sm:gap-3 sm:rounded-full sm:pl-2 sm:pr-3 sm:py-1.5 sm:text-sm ${
                activo
                  ? 'bg-blue-50 border-blue-600 text-slate-800'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: info.color }}
              >
                {info.id > 0 && (
                  <img
                    src={`${ICONO_URL}/${info.id}.png`}
                    alt=""
                    className="w-4 h-4 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </span>

              <span className="w-full truncate text-center sm:flex-1 sm:text-left">
                {info.etiqueta}
              </span>

              <span
                className={`absolute top-1 right-1 w-4 h-4 text-[10px] sm:static sm:w-5 sm:h-5 sm:text-[11px] rounded-full flex items-center justify-center shrink-0 ${
                  activo ? 'bg-blue-600 text-white' : 'hidden sm:flex bg-slate-200 text-transparent'
                }`}
                aria-hidden="true"
              >
                ✓
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}