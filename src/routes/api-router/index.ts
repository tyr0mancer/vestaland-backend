import * as express from "express";

/* Router */
import {genericRouter} from "./generic-router";
import {benutzerRouter} from "./benutzer-router";
import {dateiRouter} from "./datei-router";
import {rezeptRouter} from "./rezept.route";
import {lebensmittelRouter} from "./lebensmittel-router";

/* DB-Services */
import {
  EinkaufslisteModel,
  EssensplanModel,
  LagerortModel,
  UtensilModel,
  VorratModel
} from "../../services/database-service";

/* Schemas */
import {UtensilSchema, UtensilSucheSchema} from "../../shared-types/schemas/utensil-schema";
import {EinkaufslisteSchema} from "../../shared-types/schemas/einkaufsliste-schema";
import {EssensplanSchema} from "../../shared-types/schemas/essensplan-schema";
import {LagerortSchema} from "../../shared-types/schemas/lagerort-schema";
import {VorratSchema} from "../../shared-types/schemas/vorrat-schema";

/* Models */
import {Utensil} from "../../shared-types/models/Utensil";
import {Einkaufsliste} from "../../shared-types/models/Einkaufsliste";
import {Essensplan} from "../../shared-types/models/Essensplan";
import {Lagerort} from "../../shared-types/models/Lagerort";
import {Vorrat} from "../../shared-types/models/Vorrat";


/**
 * Routes für alle API Aufrufe - meist ein Router pro Collection
 * @see genericRouter
 */
export const apiRouter = express.Router();

// specific Api-Routes
apiRouter.use('/rezept', rezeptRouter);
apiRouter.use('/datei', dateiRouter);
apiRouter.use('/benutzer', benutzerRouter);
apiRouter.use('/lebensmittel', lebensmittelRouter);

// generic Routes
apiRouter.use('/utensil',
  genericRouter<Utensil>(
    UtensilModel,
    {
      post: UtensilSchema,
      put: UtensilSchema,
      patch: UtensilSchema,
      search: UtensilSucheSchema,
    },
    ['utensilName']
  ));

/*
apiRouter.use('/einkaufsliste', genericRouter<Einkaufsliste>(EinkaufslisteModel, EinkaufslisteSchema));
apiRouter.use('/essensplan', genericRouter<Essensplan>(EssensplanModel, EssensplanSchema));
apiRouter.use('/lagerort', genericRouter<Lagerort>(LagerortModel, LagerortSchema));
apiRouter.use('/vorrat', genericRouter<Vorrat>(VorratModel, VorratSchema));
*/
