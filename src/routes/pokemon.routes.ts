import { Router } from 'express';
import { findPokemonByName, getPokemonCsvByColor } from '../controllers/pokemon.controller';

const router = Router();

router.post('/findByName', findPokemonByName);
router.get('/csv/:color', getPokemonCsvByColor);

export default router;
