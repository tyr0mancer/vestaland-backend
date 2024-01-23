import * as express from "express";

/* Router */
import {genericRouter} from "./generic-router";
import {benutzerRouter} from "./benutzer-router";
import {dateiRouter} from "./datei-router";
import {rezeptRouter} from "./rezept.route";
import {lebensmittelRouter} from "./lebensmittel-router";

/* DB-Services */
import {
  KochschrittAktionModel,
  UtensilModel,
} from "../../services/database-service";

/* Schemas */
import {UtensilSchema, UtensilSucheSchema} from "../../shared-types/schemas/utensil-schema";

/* Models */
import {Utensil} from "../../shared-types/models/Utensil";

import {ApiRoutePath} from "../../shared-types/config";
import {KochschrittAktion} from "../../shared-types/models/KochschrittAktion";
import {
  KochschrittAktionSchema,
  KochschrittAktionSucheSchema
} from "../../shared-types/schemas/kochschritt-aktion-schema";


/**
 * Routes für alle API Aufrufe - meist ein Router pro Collection
 * @see genericRouter
 * @see ApiRoutePath
 */

export const apiRouter = express.Router();

function appendApiPath(path: ApiRoutePath, router: express.Router) {
  apiRouter.use(`/${path}`, router)
}

// specific Api-Router
appendApiPath('rezept', rezeptRouter)
appendApiPath('benutzer', benutzerRouter)
appendApiPath('datei', dateiRouter)
appendApiPath('lebensmittel', lebensmittelRouter)

// generic Router
appendApiPath('aktion', genericRouter<KochschrittAktion>(
  KochschrittAktionModel,
  {
    post: KochschrittAktionSchema,
    search: KochschrittAktionSucheSchema,
  },
  ['aktionName']
))
appendApiPath('utensil', genericRouter<Utensil>(
  UtensilModel,
  {
    post: UtensilSchema,
    put: UtensilSchema,
    patch: UtensilSchema,
    search: UtensilSucheSchema,
  },
  ['utensilName']
))

/*
apiRouter.use('/einkaufsliste', genericRouter<Einkaufsliste>(EinkaufslisteModel, EinkaufslisteSchema));
apiRouter.use('/essensplan', genericRouter<Essensplan>(EssensplanModel, EssensplanSchema));
apiRouter.use('/lagerort', genericRouter<Lagerort>(LagerortModel, LagerortSchema));
apiRouter.use('/vorrat', genericRouter<Vorrat>(VorratModel, VorratSchema));
*/
