import * as express from "express";
import {requireAdmin} from "../middleware/auth/require-admin";
import {ConfigController} from "../controllers/config-controller";

export const configRouter = express.Router();

/**
 * @see AktionIcon
 * @see Betriebsart
 * @see BenutzerRolle
 * @see Einheit
 * @see Tags
 *
 * Ziel: ersetze diese enum und weitere Werte (Icons für Lebensmittel, Utensilien, Betriebsarten) durch DB Einträge
 * Schreib-Zugriff nur für Benutzer.ADMIN
 * FrontEnd liest dann einmalig ein und sichert im State / LocalStorage
 *
 */
configRouter.get('/',
  ConfigController.readEntries
)

configRouter.post('/',
  requireAdmin,
  ConfigController.updateEntry
)
