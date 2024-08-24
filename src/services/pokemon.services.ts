import axios from 'axios';

const POKE_API_URL = 'https://pokeapi.co/api/v2';

interface PokemonApiResponse {
  base_experience: number;
  name: string;
  height: number;
  weight: number;
}

interface PokemonSpeciesResponse {
  name: string;
}

interface PokemonColorResponse {
  pokemon_species: PokemonSpeciesResponse[];
}

export const getPokemonByName = async (name: string): Promise<any> => {
  const response = await axios.get<PokemonApiResponse>(`${POKE_API_URL}/pokemon/${name}`);
  return {
    count: 1,
    results: [
      {
        base_experience: response.data.base_experience,
        name: response.data.name,
        height: response.data.height,
        weight: response.data.weight,
      },
    ],
  };
};

export const getPokemonsByColor = async (color: string): Promise<any[]> => {
  const response = await axios.get<PokemonColorResponse>(`${POKE_API_URL}/pokemon-color/${color}`);
  
  const pokemons = await Promise.all(
    response.data.pokemon_species.map(async (species) => {
      const pokemonData = await axios.get<PokemonApiResponse>(`${POKE_API_URL}/pokemon/${species.name}`);
      return {
        name: pokemonData.data.name,
        base_experience: pokemonData.data.base_experience,
        height: pokemonData.data.height,
        weight: pokemonData.data.weight,
      };
    })
  );

  return pokemons.sort((a, b) => a.base_experience - b.base_experience);
};
