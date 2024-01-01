import mongoose from 'mongoose';
import {app} from "./app";

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
const db_host = process.env.DB_SERVER || "localhost";
const start = async (): Promise<void> => {
  try {
    console.log(new Date(), 'DB Verbindungsaufbau', db_host)
    const mongoUri = process.env.DB_CONNECTION_STRING || ""
    await mongoose.connect(mongoUri)
    app.listen(port, () => {
      console.log(`Erfolgreich. Server läuft auf http://${host}:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};


void start();
