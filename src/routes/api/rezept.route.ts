import express, {Router} from "express";
import {genericParams, validateRequest} from "../../middleware/validate-request";
import {bildZuRezept, findeRezeptController, getRezeptDetailController, postRezept} from "../../controllers/rezept.controller";
import {validateAuthorization} from "../../middleware/validate-authorization";
import {BenutzerRolle} from "../../shared-types";
import {rezeptSchema} from "../../models/rezept.model";


export const rezeptRouter: Router = express.Router();

rezeptRouter.get('/', findeRezeptController)
rezeptRouter.get('/:id', validateRequest({params: genericParams}), getRezeptDetailController)

rezeptRouter.post('/:id/upload',
  validateAuthorization(BenutzerRolle.BENUTZER),
  bildZuRezept)

rezeptRouter.post('/',
  validateAuthorization(BenutzerRolle.BENUTZER),
  validateRequest({body: rezeptSchema}),
  postRezept)
