import express from 'express';
import {mainRouter} from "./routes/main-router";
import morgan from 'morgan';
import * as path from "path";
import config from "./services/config";

/**
 * Erstellt und konfiguriert eine Express-Anwendung.
 * Dies beinhaltet das Einrichten von Middleware zum Parsen von JSON,
 * das Protokollieren von Anfragen, die Behandlung von CORS, das Parsen von Cookies,
 * das Behandeln von Datei-Uploads und das Definieren von Routen.
 *
 * @see mainRouter
 * Definiert Routen für alle API-Aufrufe.
 * {@link mainRouter}
 */
export const app = express();

/**
 * Fügt Middleware hinzu, um eingehende Anfragen mit JSON-Daten zu parsen.
 */
app.use(express.json());

/**
 * Fügt Logging-Middleware hinzu, um HTTP-Anfragen und -Antworten zu protokollieren.
 * Das 'combined'-Format protokolliert die Standard-Apache-Kombinationsprotokollaufgabe.
 */
app.use(morgan('combined'));

/**
 * Definiert und konfiguriert die CORS (Cross-Origin Resource Sharing)-Richtlinie.
 * Erlaubt nur Anfragen von bestimmten Ursprüngen.
 *
 * @example
 * ```
 * app.use(cors({
 *   "origin": "*",
 *   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
 *   "preflightContinue": false,
 *   "optionsSuccessStatus": 204
 * }))
 * ```
 *
 * Entspricht:
 * ```
 * Access-Control-Allow-Origin: *
 * Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
 * Status Code: 204
 * ```
 *
 */
const cors = require('cors');
app.use(cors({
  origin: function (origin: any, callback: (error: Error | null, noError?: boolean) => {}) {
    if (!origin || config.allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}));

/**
 * Fügt Middleware hinzu, um Cookies in den Anfrage-Headern zu parsen.
 */
const cookieParser = require('cookie-parser');
app.use(cookieParser());


/**
 * Fügt den Haupt-Router als Middleware hinzu, um Routen zu behandeln.
 */
app.use('/', mainRouter);
const publicPath = path.join(__dirname, '../public')
app.use('/public', express.static(publicPath));
