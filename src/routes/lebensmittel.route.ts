import express, {Router} from "express";
import {validateRequest} from "../middleware/validate-request";
import {erstelleLebensmittelController, findeLebensmittelController} from "../controllers/lebensmittel.controller";
import {validateAuthorization} from "../middleware/validate-atuhorization";
import {lebensmittelSchema} from "../models/lebensmittel.model";
import {z} from "zod";


export const lebensmittelRouter: Router = express.Router();

// Suche
lebensmittelRouter.get('/',
  findeLebensmittelController)

lebensmittelRouter.post('/',
  validateAuthorization(['redakteur']),
  validateRequest({body: lebensmittelSchema}),
  erstelleLebensmittelController)

lebensmittelRouter.post('/import/',
  //validateAuthorization(['admin']),
  validateRequest({body: z.array(lebensmittelSchema)}),
  erstelleLebensmittelController)
