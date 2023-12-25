import express from 'express';
import {mainRouter} from "./routes";
import morgan from 'morgan';
import dotenv from "dotenv";
import * as path from "path";


// create express app
export const app = express();

// read variables from .env
dotenv.config();


/*
  Add Middleware
 */

// Parse JSON
app.use(express.json());

// Logging
app.use(morgan('combined'));

// CORS
// @todo update for production to remove 192.168.2.36
const cors = require('cors');
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
app.use(cors(corsOptions));

// Cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// File Uploads
const fileUpload = require('express-fileupload');
app.use(fileUpload());



// Routes
app.use('/', mainRouter);
const publicPath = path.join(__dirname, '../public')
app.use('/public', express.static(publicPath));

