import express, {Router} from "express";

import {BenutzerRolle} from "../../shared-types/enum";
import {validateAuthorization} from "../../middleware/validate-authorization";
import {findeAktionenController} from "../../controllers/config.controller";

export const configRouter: Router = express.Router();


configRouter.get('/aktionen',
  validateAuthorization(BenutzerRolle.BENUTZER),
  findeAktionenController)
