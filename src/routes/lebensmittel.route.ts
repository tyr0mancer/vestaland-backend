import express, {Router} from "express";
import {validateRequest} from "../middleware/validate-request";
import {
  findeLebensmittelController,
  importiereLebensmittelController
} from "../controllers/lebensmittel.controller";
import {lebensmittelSchema} from "../models/lebensmittel.model";
import {z} from "zod";

export const lebensmittelRouter: Router = express.Router();

// Suche
lebensmittelRouter.get('/',
  findeLebensmittelController)

lebensmittelRouter.post('/import/',
  //validateAuthorization(['admin']),
  validateRequest({body: z.array(lebensmittelSchema)}),
  importiereLebensmittelController)
