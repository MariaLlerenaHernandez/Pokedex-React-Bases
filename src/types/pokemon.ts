export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  baseExperience: number;
  types: string[];
  abilities: string[];
  stats: { name: string; value: number }[];
  image: string;
}
