import { useEffect, useMemo, useState } from 'react';
import ListaPokemon from '../components/pokedex/ListaPokemon';
import DetallePokemon from '../components/pokedex/DetallePokemon';
import { obtenerDetallePokemon, obtenerListaPokemon } from '../lib/pokeapi';
import type { PokemonDetail, PokemonListItem } from '../types/pokemon';

interface Props {
  onRegresar: () => void;
}

export default function Pokedex({ onRegresar }: Props) {
  const [pokemones, setPokemones] = useState<PokemonListItem[]>([]);
  const [cargandoLista, setCargandoLista] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  const [seleccionado, setSeleccionado] = useState<PokemonListItem | null>(null);
  const [detalle, setDetalle] = useState<PokemonDetail | null>(null);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);
  const [cache, setCache] = useState<Record<string, PokemonDetail>>({});

  useEffect(() => {
    obtenerListaPokemon(151)
      .then((datos) => {
        setPokemones(datos);
        if (datos.length > 0) setSeleccionado(datos[0]);
      })
      .catch((error) => console.error('Error al obtener la lista de Pokémon', error))
      .finally(() => setCargandoLista(false));
  }, []);

  useEffect(() => {
    if (!seleccionado) return;

    if (cache[seleccionado.name]) {
      setDetalle(cache[seleccionado.name]);
      return;
    }

    setCargandoDetalle(true);
    obtenerDetallePokemon(seleccionado.url)
      .then((datos) => {
        setDetalle(datos);
        setCache((previo) => ({ ...previo, [seleccionado.name]: datos }));
      })
      .catch((error) => console.error('Error al obtener el detalle del Pokémon', error))
      .finally(() => setCargandoDetalle(false));
  }, [seleccionado, cache]);

  const pokemonesFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return pokemones;
    return pokemones.filter((p) => p.name.toLowerCase().includes(texto));
  }, [pokemones, busqueda]);

  return (
    <div className="p-6 sm:p-8 bg-slate-50 min-h-screen">
      <button
        onClick={onRegresar}
        className="mb-4 border border-slate-200 bg-white text-slate-600 text-sm font-medium rounded-lg px-4 py-2 hover:bg-slate-100 transition-colors cursor-pointer"
      >
        ← Regresar
      </button>

      <div className="mb-6">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar Pokémon..."
          className="w-full border border-slate-200 bg-white rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <ListaPokemon
          pokemones={pokemonesFiltrados}
          total={pokemones.length}
          seleccionado={seleccionado?.name ?? null}
          onSeleccionar={setSeleccionado}
          cargando={cargandoLista}
        />
        <DetallePokemon pokemon={detalle} cargando={cargandoDetalle} />
      </div>
    </div>
  );
}
