import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import {requestLogger} from "./middleware/request-logger";
import apiRoutes from "./routes";


// read variables from .env
dotenv.config();


// launch express app
const app = express();

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
app.set("port", port)


// Middleware
app.use(requestLogger);
app.use(express.json());


// Routes
app.get('/', (req, res) => {
  res.send('Hello Mundo!!');
});

app.use('/api', apiRoutes);



const start = async (): Promise<void> => {
  try {
    console.log('Versuche Verbindungsaufbau zu MongoDB')

    // connect to mongoDB Atlas
    const mongoUri = process.env.DB_CONNECTION_STRING || ""
    await mongoose.connect(mongoUri)
    app.listen(port, () => {
      console.log('Erfolgreich mit MongoDB verbunden');
      console.log(`Server läuft auf http://${host}:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};


void start();
