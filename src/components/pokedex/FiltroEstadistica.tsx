interface Estadistica {
  valor: string;
  etiqueta: string;
}

const ESTADISTICAS: Estadistica[] = [
  { valor: 'Speed', etiqueta: 'Velocidad' },
  { valor: 'Attack', etiqueta: 'Ataque' },
  { valor: 'Defense', etiqueta: 'Defensa' },
  { valor: 'Special Attack', etiqueta: 'Ataque especial' },
  { valor: 'Special Defense', etiqueta: 'Defensa especial' },
  { valor: 'Hp', etiqueta: 'HP' },
];

interface Props {
  estadistica: string;
  comparador: 'gte' | 'lte';
  umbral: string;
  onEstadisticaChange: (valor: string) => void;
  onComparadorChange: (valor: 'gte' | 'lte') => void;
  onUmbralChange: (valor: string) => void;
}

export default function FiltroEstadistica({
  estadistica,
  comparador,
  umbral,
  onEstadisticaChange,
  onComparadorChange,
  onUmbralChange,
}: Props) {
  return (
    <div className="bg-white border border-blue-100 rounded-xl p-3 mb-4">
      <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide mb-2">
        Ordenar y filtrar por estadística
      </p>
      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={estadistica}
          onChange={(e) => onEstadisticaChange(e.target.value)}
          className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm text-slate-700 bg-white cursor-pointer"
        >
          {ESTADISTICAS.map((e) => (
            <option key={e.valor} value={e.valor}>
              {e.etiqueta}
            </option>
          ))}
        </select>

        <select
          value={comparador}
          onChange={(e) => onComparadorChange(e.target.value as 'gte' | 'lte')}
          className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm text-slate-700 bg-white cursor-pointer"
        >
          <option value="gte">mayor o igual a</option>
          <option value="lte">menor o igual a</option>
        </select>

        <input
          type="number"
          min={0}
          value={umbral}
          placeholder="0"
          onChange={(e) => onUmbralChange(e.target.value)}
          className="w-20 border border-slate-200 rounded-lg px-2 py-1.5 text-sm text-slate-700"
        />
      </div>
    </div>
  );
}