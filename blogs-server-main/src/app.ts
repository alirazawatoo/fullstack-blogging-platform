import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import routes from './routes/index';

// CORS options
const options: cors.CorsOptions = {
  origin: process.env.REACT_APP_URL,
};

// Creating Express app
export const app = express();

// Applying CORS middleware with options
app.use(cors(options));

// Applying Morgan logger middleware
app.use(logger('dev'));

// Parsing JSON requests
app.use(express.json());

// Mounting routes
app.use('/api', routes);

// Setting up port
const port = process.env.PORT || 8080;

// Starting server
app.listen(port, () => console.log(`Server started at: http://localhost:${port}`));
