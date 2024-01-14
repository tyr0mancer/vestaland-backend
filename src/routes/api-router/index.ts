import * as express from "express";

/* Router */
import {genericRouter} from "./generic-router";
import {benutzerRouter} from "./benutzer-router";
import {dateiRouter} from "./datei-router";
import {rezeptRouter} from "./rezept.route";
import {lebensmittelRouter} from "./lebensmittel-router";

/* Types, Schemata und Model für generic-router */
import {UtensilSchema, UtensilSucheSchema} from "../../shared-types/model/utensil.schema";
import {UtensilModel} from "../../services/database-service";
import {Utensil} from "../../shared-types/model/Utensil";
import {Essensplan, EssensplanModel, essensplanSchema} from "../../shared-types/model/essensplan.model";
import {Lagerort, LagerortModel, lagerortSchema} from "../../shared-types/model/lagerort.model";
import {Vorrat, VorratModel, vorratSchema} from "../../shared-types/model/vorrat.model";
import {Einkaufsliste, EinkaufslisteModel, EinkaufslisteSchema} from "../../shared-types/model/einkaufsliste.model";

/**
 * Routes für API Aufrufe
 *
 * @see genericRouter
 */
export const apiRouter = express.Router();

// specific Api-Routes
apiRouter.use('/rezept', rezeptRouter);
apiRouter.use('/datei', dateiRouter);
apiRouter.use('/benutzer', benutzerRouter);
apiRouter.use('/lebensmittel', lebensmittelRouter);

// generic Routes
apiRouter.use('/utensil', genericRouter<Utensil>(UtensilModel, UtensilSchema, UtensilSucheSchema, ['utensilName']));
apiRouter.use('/einkaufsliste', genericRouter<Einkaufsliste>(EinkaufslisteModel, EinkaufslisteSchema));
apiRouter.use('/essensplan', genericRouter<Essensplan>(EssensplanModel, essensplanSchema));
apiRouter.use('/lagerort', genericRouter<Lagerort>(LagerortModel, lagerortSchema));
apiRouter.use('/vorrat', genericRouter<Vorrat>(VorratModel, vorratSchema));


