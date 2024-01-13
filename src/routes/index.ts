import * as express from "express";
import {genericRouter} from "./generic/generic-router";

import {Utensil} from "../shared-types/schema/Utensil";
import {authRouter} from "./auth/auth.route";
import {rezeptRouter} from "./api/rezept.route";
import {dateiRouter} from "./api/datei.route";
import {Essensplan, EssensplanModel, essensplanSchema} from "../shared-types/schema/essensplan.model";
import {Lagerort, LagerortModel, lagerortSchema} from "../shared-types/schema/lagerort.model";
import {KochschrittAktion} from "../shared-types/schema/KochschrittAktion";
import {configRouter} from "./api/config.route";
import {Vorrat, VorratModel, vorratSchema} from "../shared-types/schema/vorrat.model";
import {KochschrittAktionModel, LebensmittelModel, UtensilModel} from "../db-model";
import {KochschrittAktionSchema} from "../shared-types/schema/kochschritt-aktion.schema";
import {UtensilSchema, UtensilSucheSchema} from "../shared-types/schema/utensil.schema";
import {Lebensmittel} from "../shared-types/schema/Lebensmittel";
import {LebensmittelSchema, LebensmittelSucheSchema} from "../shared-types/schema/lebensmittel.schema";
import {Einkaufsliste, EinkaufslisteModel, EinkaufslisteSchema} from "../shared-types/schema/einkaufsliste.model";
import {benutzerRouter} from "./api/benutzer-router";

const apiRouter = express.Router();

// Authentication
apiRouter.use('/auth', authRouter);

// specific Api-Routes
apiRouter.use('/rezept', rezeptRouter);
apiRouter.use('/datei', dateiRouter);
apiRouter.use('/config', configRouter);

apiRouter.use('/benutzer', benutzerRouter);
apiRouter.use('/config/aktionen', genericRouter<KochschrittAktion>(KochschrittAktionModel, KochschrittAktionSchema));


// generic Routes
apiRouter.use('/lebensmittel', genericRouter<Lebensmittel>(LebensmittelModel, LebensmittelSchema, LebensmittelSucheSchema));
apiRouter.use('/utensil', genericRouter<Utensil>(UtensilModel, UtensilSchema, UtensilSucheSchema, ['utensilName']));
apiRouter.use('/essensplan', genericRouter<Essensplan>(EssensplanModel, essensplanSchema));
apiRouter.use('/einkaufsliste', genericRouter<Einkaufsliste>(EinkaufslisteModel, EinkaufslisteSchema));
apiRouter.use('/lagerort', genericRouter<Lagerort>(LagerortModel, lagerortSchema));
apiRouter.use('/vorrat', genericRouter<Vorrat>(VorratModel, vorratSchema));


export const mainRouter = express.Router();
mainRouter.use('/api', apiRouter)

// test and documentation
mainRouter.get('/', (req, res) => res.send('Hello Mundo!'));
