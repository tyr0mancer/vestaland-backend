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
import {BenutzerRolle} from "../../shared-types/enum";
import {RezeptSchema} from "../../shared-types/models/rezept.schema";


export const rezeptRouter: Router = express.Router();

rezeptRouter.get('/', readToken, validateRequest(findeRezeptSchema), findeRezeptController)
rezeptRouter.get('/:id', validateRequest({params: genericParams}), getRezeptDetailController)

rezeptRouter.post('/:id/upload',
  validateAuthorization(BenutzerRolle.BENUTZER),
  bildZuRezept)

rezeptRouter.post('/',
  validateAuthorization(BenutzerRolle.BENUTZER),
  validateRequest({body: RezeptSchema}),
  postRezept)
