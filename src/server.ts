import mongoose from 'mongoose';
import {app} from "./app";
import config from "./config";

const start = async (): Promise<void> => {
  try {
    console.log(new Date(), 'DB Verbindungsaufbau', config.db.host)
    await mongoose.connect(config.db.connectionString)
    app.listen(config.port, () => {
      console.log(`Server läuft auf ${config.host}:${config.port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};


void start();
