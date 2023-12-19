import express, {Router} from "express";
import {validateRequest} from "../../middleware/validate-request";
import {
  findeLebensmittelController,
  importiereLebensmittelController
} from "../../controllers/lebensmittel.controller";
import {lebensmittelSchema} from "../../models/lebensmittel.model";
import {z} from "zod";
import {BenutzerRolle} from "../../models/benutzer.model";
import {validateAuthorization} from "../../middleware/validate-authorization";

export const lebensmittelRouter: Router = express.Router();

lebensmittelRouter.get('/',
  findeLebensmittelController)

lebensmittelRouter.post('/import/',
  validateAuthorization(BenutzerRolle.ADMIN),
  validateRequest({body: z.array(lebensmittelSchema)}),
  importiereLebensmittelController)
