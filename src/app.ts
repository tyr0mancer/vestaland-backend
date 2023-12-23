import express from 'express';
import dotenv from 'dotenv';
import {mainRouter} from "./routes";
import morgan from 'morgan';

const cookieParser = require('cookie-parser');

// read variables from .env
dotenv.config();

// create express app
const app = express();

// Cookies
app.use(cookieParser());


// Middleware
app.use(morgan('combined'));
app.use(express.json());

// CORS
// @todo update for production
const corsOptions = {
  origin: process.env.FRONTEND_CORS_URL || 'https://vestaland.netlify.app',
  preflightContinue: true,
  credentials: true
}
const cors = require('cors');
app.use(cors(corsOptions));


// Routes
app.use('/', mainRouter);

export default app;

