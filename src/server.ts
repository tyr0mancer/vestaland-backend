import mongoose from 'mongoose';
import {app} from "./app";

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
const start = async (): Promise<void> => {
  try {
    const currentTime = new Date();
    console.log(currentTime);
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
