import * as express from "express";
import {genericRouter} from "./generic/generic-router";

import {Rezept, RezeptModel, rezeptSchema} from "../models/rezept.model";
import {Lebensmittel, LebensmittelModel, lebensmittelSchema} from "../models/lebensmittel.model";
import {Hilfsmittel, HilfsmittelModel, hilfsmittelSchema} from "../models/hilfsmittel.model";
import {Einkaufsliste, EinkaufslisteModel, einkaufslisteSchema} from "../models/einkaufsliste.model";
import {authRouter} from "./auth/auth.route";
import {rezeptRouter} from "./api/rezept.route";
import {lebensmittelRouter} from "./api/lebensmittel.route";
import {dateiRouter} from "./api/datei.route";

const apiRouter = express.Router();

// Authentication
apiRouter.use('/auth', authRouter);

// specific Api-Routes
apiRouter.use('/rezept', rezeptRouter);
apiRouter.use('/lebensmittel', lebensmittelRouter);
apiRouter.use('/datei', dateiRouter);

// generic Routes
apiRouter.use('/rezept', genericRouter<Rezept>(RezeptModel, rezeptSchema));
apiRouter.use('/lebensmittel', genericRouter<Lebensmittel>(LebensmittelModel, lebensmittelSchema));
apiRouter.use('/hilfsmittel', genericRouter<Hilfsmittel>(HilfsmittelModel, hilfsmittelSchema));
apiRouter.use('/einkaufsliste', genericRouter<Einkaufsliste>(EinkaufslisteModel, einkaufslisteSchema));

export const mainRouter = express.Router();
mainRouter.use('/api', apiRouter)

// test and documentation
mainRouter.get('/', (req, res) => res.send('Hello Mundo!'));
