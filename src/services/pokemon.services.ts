require('dotenv').config();
import axios from 'axios';
import { PokemonApiResponse, PokemonColorResponse } from '../types/pokemon.types';

const POKE_API_URL = process.env.POKE_API_URL;

export const getPokemonByName = async (name: string): Promise<any> => {
  // Fetch Pokemon data by name from the API
  const response = await axios.get<PokemonApiResponse>(`${POKE_API_URL}/pokemon/${name}`);

  console.log(response.data);
  
  
  // Return the relevant Pokemon data
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
  try {
    // Fetch Pokemon species by color from the API
    const response = await axios.get<PokemonColorResponse>(`${POKE_API_URL}/pokemon-color/${color}`);

    const pokemons: any[] = [];

    // For each species, fetch detailed Pokemon data
    for (const species of response.data.pokemon_species) {
      try {
        const pokemonData = await axios.get<PokemonApiResponse>(`${POKE_API_URL}/pokemon/${species.name}`);

        // Push the relevant Pokemon data to the array
        pokemons.push({
          name: pokemonData.data.name,
          base_experience: pokemonData.data.base_experience,
          height: pokemonData.data.height,
          weight: pokemonData.data.weight,
        });
      } catch (err) {
        // Handle errors that occur during individual Pokemon data fetching
        if (axios.isAxiosError(err)) {
          // Axios-specific error handling
          console.error('Axios error:', {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
          });
        } else {
          // Handle unexpected errors
          console.error('Unexpected error:', err);
        }
      }
    }

    // Return the list of Pokemon without sorting
    return pokemons;
  } catch (error) {
    // Handle errors that occur during fetching Pokemon by color
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      console.error('Axios error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      // Handle unexpected errors
      console.error('Unexpected error:', error);
    }
    throw new Error('Failed to fetch pokemons by color');
  }
};
