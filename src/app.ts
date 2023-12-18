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

// Routes
app.use('/', mainRouter);

export default app;

