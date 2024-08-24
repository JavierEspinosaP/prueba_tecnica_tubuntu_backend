import express from 'express';
import pokemonRoutes from './routes/pokemon.routes';

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Base route ("/")
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pokemon API - Technical Test</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                background-color: #f0f0f0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                background-color: #ffffff;
                padding: 20px 40px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                width: 100%;
            }
            h1 {
                color: #333;
                text-align: center;
                margin-bottom: 20px;
            }
            p, .email {
                margin: 10px 0;
            }
            .route {
                margin-bottom: 15px;
            }
            .route strong {
                display: block;
                font-size: 1.1em;
                margin-bottom: 5px;
            }
            code {
                background-color: #f4f4f4;
                padding: 2px 4px;
                border-radius: 4px;
                display: block;
                margin: 10px 0;
                white-space: pre-wrap;
            }
            .email {
                margin-top: 20px;
                font-style: italic;
                color: #555;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Javier Espinosa's Technical Test!</h1>
            <div class="route">
                <strong>POST Route /pokemon/findByName:</strong>
                <p>Example body:</p>
                <code>{"name": "pikachu"}</code>
                <p>- Returns the specified Pokémon data as indicated in the 'body'.</p>
            </div>
            <div class="route">
                <strong>GET Route /pokemon/csv/:color:</strong>
                <p>- Returns a CSV file with a list of Pokémon of the specified color, sorted by 'base_experience' from lowest to highest.</p>
            </div>
            <p class="email">For any questions, feel free to reach out to me!</p>
            <p class="email">javierespinosapasamontes@gmail.com</p>
            <p class="email">Thank you!</p>
        </div>
    </body>
    </html>
  `);
});

// Routes for "/pokemon"
app.use('/pokemon', pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
