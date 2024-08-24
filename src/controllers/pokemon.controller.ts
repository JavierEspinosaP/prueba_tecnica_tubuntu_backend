import { Request, Response } from 'express';
import { getPokemonByName, getPokemonsByColor } from '../services/pokemon.services';
import { generateCsv } from '../utils/csv.util';

export const findPokemonByName = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Pokemon name is required' });
    return;
  }

  try {
    const pokemonData = await getPokemonByName(name.toLowerCase());
    res.json(pokemonData);
  } catch (error) {
    res.status(404).json({ error: 'Pokemon not found' });
  }
};

export const getPokemonCsvByColor = async (req: Request, res: Response): Promise<void> => {
  const { color } = req.params;

  try {
    const pokemons = await getPokemonsByColor(color.toLowerCase());

    const filePath = await generateCsv(pokemons);
    
    res.download(filePath, 'pokemons.csv', (err) => {
      if (err) {
        res.status(500).send('Error generating CSV');
      }
    });
  } catch (error) {
    res.status(404).json({ error: 'No pokemons found for the given color' });
  }
};
