import { useEffect, useMemo, useState } from "react";
import ListaPokemon from "../components/pokedex/ListaPokemon";
import DetallePokemon from "../components/pokedex/DetallePokemon";
import FiltroEstadistica from "../components/pokedex/FiltroEstadistica";
import FiltroTipo from "../components/pokedex/FiltroTipo";
import { obtenerDetallePokemon, obtenerListaPokemon } from "../lib/pokeapi";
import type { PokemonDetail } from "../types/pokemon";

interface Props {
  onRegresar: () => void;
}

const CLAVE_FAVORITOS = "pokedex-favoritos";

export default function Pokedex({ onRegresar }: Props) {
  const [detalles, setDetalles] = useState<PokemonDetail[]>([]);
  const [cargandoLista, setCargandoLista] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  const [estadistica, setEstadistica] = useState("Speed");
  const [comparador, setComparador] = useState<"gte" | "lte">("gte");
  const [umbral, setUmbral] = useState("");
  const [tiposSeleccionados, setTiposSeleccionados] = useState<string[]>([]);

  const [favoritos, setFavoritos] = useState<number[]>(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_FAVORITOS);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });
  const [soloFavoritos, setSoloFavoritos] = useState(false);

  const [seleccionado, setSeleccionado] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    obtenerListaPokemon(151)
      .then((lista) =>
        Promise.all(lista.map((p) => obtenerDetallePokemon(p.url))),
      )
      .then((detallesCompletos) => {
        setDetalles(detallesCompletos);
        if (detallesCompletos.length > 0) setSeleccionado(detallesCompletos[0]);
      })
      .catch((error) => console.error("Error al obtener los Pokémon", error))
      .finally(() => setCargandoLista(false));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
    } catch {
      // sin espacio o bloqueado: los favoritos solo duran la sesión
    }
  }, [favoritos]);

  const tiposDisponibles = useMemo(
    () => [...new Set(detalles.flatMap((p) => p.types))].sort(),
    [detalles],
  );

  const alternarTipo = (tipo: string) => {
    setTiposSeleccionados((previo) =>
      previo.includes(tipo)
        ? previo.filter((t) => t !== tipo)
        : [...previo, tipo],
    );
  };

  const alternarFavorito = (id: number) => {
    setFavoritos((previo) =>
      previo.includes(id) ? previo.filter((f) => f !== id) : [...previo, id],
    );
  };

  const restablecerFiltros = () => {
    setTiposSeleccionados([]);
    setBusqueda("");
    setEstadistica("Speed");
    setComparador("gte");
    setUmbral("");
  };

  const pokemonesFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    const obtenerValor = (p: PokemonDetail) =>
      p.stats.find((s) => s.name === estadistica)?.value ?? 0;

    return detalles
      .filter((p) => !soloFavoritos || favoritos.includes(p.id))
      .filter((p) => p.name.toLowerCase().includes(texto))
      .filter(
        (p) =>
          tiposSeleccionados.length === 0 ||
          p.types.some((t) => tiposSeleccionados.includes(t)),
      )
      .filter((p) => {
        if (umbral === "") return true;
        const limite = Number(umbral);
        return comparador === "gte"
          ? obtenerValor(p) >= limite
          : obtenerValor(p) <= limite;
      })
      .sort((a, b) =>
        comparador === "gte"
          ? obtenerValor(b) - obtenerValor(a)
          : obtenerValor(a) - obtenerValor(b),
      );
  }, [
    detalles,
    busqueda,
    estadistica,
    comparador,
    umbral,
    tiposSeleccionados,
    soloFavoritos,
    favoritos,
  ]);

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      <button
        onClick={onRegresar}
        className="mb-4 border border-slate-200 bg-white text-slate-600 text-sm font-medium rounded-lg px-4 py-2 hover:bg-slate-100 transition-colors cursor-pointer"
      >
        ← Regresar
      </button>

      <div className="mb-4">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar Pokémon..."
          className="w-full border border-slate-200 bg-white rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <FiltroTipo
        tipos={tiposDisponibles}
        seleccionados={tiposSeleccionados}
        onToggle={alternarTipo}
        onRestablecer={restablecerFiltros}
      />

      <FiltroEstadistica
        estadistica={estadistica}
        comparador={comparador}
        umbral={umbral}
        onEstadisticaChange={setEstadistica}
        onComparadorChange={setComparador}
        onUmbralChange={setUmbral}
      />

      <div className="flex w-full sm:w-80 bg-white border border-slate-200 rounded-xl p-1 mb-4">
        <button
          onClick={() => setSoloFavoritos(false)}
          className={`flex-1 text-center rounded-lg px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
            !soloFavoritos
              ? "bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 text-white shadow-[0_0_12px_rgba(255,74,28,0.45)]"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setSoloFavoritos(true)}
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
            soloFavoritos
              ? "bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 text-white shadow-[0_0_12px_rgba(255,74,28,0.45)]"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Favoritos
          <span
            className={`text-xs rounded-full px-2 py-0.5 ${
              soloFavoritos
                ? "bg-white/25 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {favoritos.length}
          </span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <ListaPokemon
          pokemones={pokemonesFiltrados}
          total={detalles.length}
          estadistica={estadistica}
          seleccionado={seleccionado?.id ?? null}
          favoritos={favoritos}
          onSeleccionar={setSeleccionado}
          onToggleFavorito={alternarFavorito}
          cargando={cargandoLista}
        />
        <DetallePokemon
          pokemon={seleccionado}
          cargando={false}
          esFavorito={
            seleccionado ? favoritos.includes(seleccionado.id) : false
          }
          onToggleFavorito={() =>
            seleccionado && alternarFavorito(seleccionado.id)
          }
        />
      </div>
    </div>
  );
}
