import type { PokemonDetail, PokemonListItem } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

const STAT_LABELS: Record<string, string> = {
  hp: 'Hp',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Special Attack',
  'special-defense': 'Special Defense',
  speed: 'Speed',
};

function capitalizar(texto: string): string {
  return texto
    .split('-')
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
}

export async function obtenerListaPokemon(limite = 151): Promise<PokemonListItem[]> {
  const respuesta = await fetch(`${BASE_URL}/pokemon?limit=${limite}`);
  if (!respuesta.ok) throw new Error('No se pudo obtener la lista de Pokémon');
  const datos = await respuesta.json();
  return datos.results;
}

export async function obtenerDetallePokemon(url: string): Promise<PokemonDetail> {
  const respuesta = await fetch(url);
  if (!respuesta.ok) throw new Error('No se pudo obtener el detalle del Pokémon');
  const datos = await respuesta.json();

  return {
    id: datos.id,
    name: capitalizar(datos.name),
    height: datos.height / 10,
    weight: datos.weight / 10,
    baseExperience: datos.base_experience,
    types: datos.types.map((t: { type: { name: string } }) => capitalizar(t.type.name)),
    abilities: datos.abilities.map((a: { ability: { name: string } }) =>
      capitalizar(a.ability.name),
    ),
    stats: datos.stats.map((s: { base_stat: number; stat: { name: string } }) => ({
      name: STAT_LABELS[s.stat.name] ?? capitalizar(s.stat.name),
      value: s.base_stat,
    })),
    image:
      datos.sprites?.other?.['official-artwork']?.front_default ??
      datos.sprites?.front_default ??
      '',
  };
}
