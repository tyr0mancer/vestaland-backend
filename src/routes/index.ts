import * as express from "express";
import {genericRouter} from "./generic-router";
import rezeptRouter from "./rezept.route";

import {Rezept, RezeptModel, rezeptSchema} from "../models/rezept.model";
import {Lebensmittel, LebensmittelModel, lebensmittelSchema} from "../models/lebensmittel.model";
import {Hilfsmittel, HilfsmittelModel, hilfsmittelSchema} from "../models/hilfsmittel.model";
import {Einkaufsliste, EinkaufslisteModel, einkaufslisteSchema} from "../models/einkaufsliste.model";

const apiRoutes = express.Router();

apiRoutes.use('/rezept', rezeptRouter);
apiRoutes.use('/rezept', genericRouter<Rezept>(RezeptModel, rezeptSchema));
apiRoutes.use('/lebensmittel', genericRouter<Lebensmittel>(LebensmittelModel, lebensmittelSchema));
apiRoutes.use('/hilfsmittel', genericRouter<Hilfsmittel>(HilfsmittelModel, hilfsmittelSchema));
apiRoutes.use('/einkaufsliste', genericRouter<Einkaufsliste>(EinkaufslisteModel, einkaufslisteSchema));

export default apiRoutes
