export interface PokemonApiResponse {
  count: number;
  base_experience: number;
  name: string;
  height: number;
  weight: number;
}

export interface PokemonSpeciesResponse {
  name: string;
}

export interface PokemonColorResponse {
  pokemon_species: PokemonSpeciesResponse[];
}
