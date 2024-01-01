import express, {Router} from "express";

import {BenutzerRolle} from "../../shared-types";
import {validateAuthorization} from "../../middleware/validate-authorization";
import {deleteFile, uploadFile} from "../../controllers/datei.controller";
import {genericParams, validateRequest} from "../../middleware/validate-request";

export const dateiRouter: Router = express.Router();

dateiRouter.post('/',
  validateAuthorization(BenutzerRolle.BENUTZER),
  uploadFile)

dateiRouter.delete('/:id',
  validateAuthorization(BenutzerRolle.ADMIN),
  validateRequest({params: genericParams}),
  deleteFile)
