import * as express from "express";
import {genericRouter} from "./generic-router";

import lebensmittelRouter from "./lebensmittel.route";
import {rezeptRouter} from "./rezept.route";

import {Rezept, RezeptModel, rezeptSchema} from "../models/rezept.model";
import {Lebensmittel, LebensmittelModel, lebensmittelSchema} from "../models/lebensmittel.model";
import {Hilfsmittel, HilfsmittelModel, hilfsmittelSchema} from "../models/hilfsmittel.model";
import {Einkaufsliste, EinkaufslisteModel, einkaufslisteSchema} from "../models/einkaufsliste.model";

export const apiRouter = express.Router();

apiRouter.use('/rezept', rezeptRouter);
apiRouter.use('/lebensmittel', lebensmittelRouter);

// generic Routes
apiRouter.use('/rezept', genericRouter<Rezept>(RezeptModel, rezeptSchema));
apiRouter.use('/lebensmittel', genericRouter<Lebensmittel>(LebensmittelModel, lebensmittelSchema));
apiRouter.use('/hilfsmittel', genericRouter<Hilfsmittel>(HilfsmittelModel, hilfsmittelSchema));
apiRouter.use('/einkaufsliste', genericRouter<Einkaufsliste>(EinkaufslisteModel, einkaufslisteSchema));
