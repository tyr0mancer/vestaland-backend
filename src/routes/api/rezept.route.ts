import express, {Router} from "express";
import {genericParams, validateRequest} from "../../middleware/validate-request";
import {
  bildZuRezept,
  findeRezeptController,
  findeRezeptSchema,
  getRezeptDetailController,
  postRezept
} from "../../controllers/rezept.controller";
import {readToken, validateAuthorization} from "../../middleware/validate-authorization";
import {BenutzerRolle} from "../../shared-types";
import {rezeptSchema} from "../../models/rezept.model";


export const rezeptRouter: Router = express.Router();

rezeptRouter.get('/', readToken, validateRequest(findeRezeptSchema), findeRezeptController)
rezeptRouter.get('/:id', validateRequest({params: genericParams}), getRezeptDetailController)

rezeptRouter.post('/:id/upload',
  validateAuthorization(BenutzerRolle.BENUTZER),
  bildZuRezept)

rezeptRouter.post('/',
  validateAuthorization(BenutzerRolle.BENUTZER),
  validateRequest({body: rezeptSchema}),
  postRezept)
