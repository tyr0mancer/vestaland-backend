import express, {Router} from "express";
import {validateAuthorization} from "../../middleware/validate-authorization";
import {findeUtensilController} from "../../controllers/utensil.controller";
import {BenutzerRolle} from "../../shared-types";

export const utensilRouter: Router = express.Router();

utensilRouter.get('/',
  validateAuthorization(BenutzerRolle.BENUTZER),
  findeUtensilController)
