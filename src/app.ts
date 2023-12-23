import express from 'express';
import dotenv from 'dotenv';
import {mainRouter} from "./routes";
import morgan from 'morgan';


// read variables from .env
dotenv.config();

// create express app
const app = express();

// Cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());


// Middleware
app.use(morgan('combined'));
app.use(express.json());

// CORS
// @todo update for production
const allowedOrigins = [
  'https://vestaland.netlify.app',
  'http://192.168.2.36:3000'
];

const corsOptions = {
  origin: function (origin: any, callback: (error: Error | null, noError?: boolean) => {}) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
const cors = require('cors');
app.use(cors(corsOptions));


// Routes
  app.use('/', mainRouter);

export default app;

