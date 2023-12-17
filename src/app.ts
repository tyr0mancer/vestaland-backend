import express from 'express';
import dotenv from 'dotenv';
import {apiRouter} from "./routes";
import morgan from 'morgan';

// read variables from .env
dotenv.config();

// create express app
const app = express();

// Middleware
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Hello Mundo!'));
app.use('/api', apiRouter);

export default app;
