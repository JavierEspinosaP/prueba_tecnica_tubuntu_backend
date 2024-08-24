import { Request, Response } from 'express';
import { getPokemonByName, getPokemonsByColor } from '../services/pokemon.services';
import { generateCsv } from '../utils/csv.util';


export const findPokemonByName = async (req: Request, res: Response): Promise<void> => {
  let { name } = req.body;

  // Check if the name parameter is provided
  if (!name) {
    res.status(400).json({ error: 'Pokemon name is required' });
    return;
  }

  try {
    // Normalize the name by removing extra spaces and converting it to lowercase
    name = name.trim().toLowerCase().replace(/\s+/g, '');

    // Fetch the Pokemon data by name
    const pokemonData = await getPokemonByName(name);

    // Check if any Pokémon was found
    if (pokemonData.results.length === 0) {
      res.status(404).json({ error: 'Pokemon not found' });
      return;
    }

    // Respond with the Pokemon data in JSON format
    res.json(pokemonData);
  } catch (error) {
    // Handle unexpected errors
    console.error('Error fetching Pokemon:', error);
    res.status(500).json({ error: 'An error occurred while fetching the Pokemon' });
  }
};



export const getPokemonCsvByColor = async (req: Request, res: Response): Promise<void> => {
  const { color } = req.params;

  try {
    // Fetch the list of Pokemon by color
    const pokemons = await getPokemonsByColor(color.toLowerCase());

    // Check if any Pokemon were found
    if (!pokemons || pokemons.length === 0) {
      res.status(404).json({ error: 'No pokemons found for the given color' });
      return;
    }

    // Generate the CSV file with the fetched data
    const filePath = await generateCsv(pokemons);
    
    // Send the generated CSV file to the client
    res.download(filePath, 'pokemons.csv', (err) => {
      if (err) {
        // Handle any errors that occur during the file download
        res.status(500).send('Error generating CSV');
      }
    });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(404).json({ error: 'No pokemons found for the given color' });
  }
};
