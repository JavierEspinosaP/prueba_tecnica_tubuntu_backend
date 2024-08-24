import express from 'express';
import pokemonRoutes from './routes/pokemon.routes';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/pokemon', pokemonRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});