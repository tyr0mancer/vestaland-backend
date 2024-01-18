import mongoose from 'mongoose';
import {app} from "./app";
import config from "./services/config";

/**
 * Starts the Express application.
 * Connects to MongoDB and listens on the specified port.
 */
export const start = async (): Promise<void> => {

    try {
      console.log(new Date(), 'DB Verbindungsaufbau...', config.db.host)
      await mongoose.connect(config.db.connectionString)
      app.listen(config.port, () => {
        console.log(`Server läuft auf ${config.host}:${config.port}`);
      });
    } catch (error) {
      console.error(error);
      process.exit(1);

      /*
            app.listen(config.port, () => {
              console.log(`Server läuft im Notmodus ${config.host}:${config.port}`);
            });
            app.use('/api/!*', (req, res, next) => sendErrorResponse(res, 500, 'MongoDB Datenbank derzeit nicht erreichbar'))
      */
    }
};

void start();
