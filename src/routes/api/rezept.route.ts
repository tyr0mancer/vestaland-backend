import express, {Router} from "express";
import {genericParams, validateRequest} from "../../middleware/validate-request";
import {bildZuRezept, findeRezept, getRezeptDetail, postRezept} from "../../controllers/rezept.controller";
import {validateAuthorization} from "../../middleware/validate-authorization";
import {BenutzerRolle} from "../../types/types";
import {rezeptSchema} from "../../models/rezept.model";


export const rezeptRouter: Router = express.Router();

rezeptRouter.get('/', findeRezept)
rezeptRouter.get('/:id', validateRequest({params: genericParams}), getRezeptDetail)

rezeptRouter.post('/:id/upload',
  validateAuthorization(BenutzerRolle.BENUTZER),
  bildZuRezept)

rezeptRouter.post('/',
  validateAuthorization(BenutzerRolle.BENUTZER),
  validateRequest({body: rezeptSchema}),
  postRezept)
