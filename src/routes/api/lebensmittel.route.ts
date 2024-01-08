import express, {Router} from "express";
import {genericParams, idListParams, validateRequest} from "../../middleware/validate-request";
import {
  deleteManyLebensmittelController,
  findeLebensmittelController,
  importiereLebensmittelController
} from "../../controllers/lebensmittel.controller";
import {Lebensmittel, LebensmittelModel, LebensmittelSchema} from "../../shared-types/models/lebensmittel.model";
import {z} from "zod";

import {validateAuthorization} from "../../middleware/validate-authorization";
import {BenutzerRolle} from "../../shared-types/enum";
import {genericGet, genericPost, genericPut} from "../../controllers/generic-controller";

export const lebensmittelRouter: Router = express.Router();

lebensmittelRouter.get('/:id',
  validateAuthorization(BenutzerRolle.BENUTZER),
  validateRequest({params: genericParams}),
  genericGet<Lebensmittel>(LebensmittelModel))

lebensmittelRouter.post('/',
  validateAuthorization(BenutzerRolle.BENUTZER),
  validateRequest({body: LebensmittelSchema}),
  genericPost<Lebensmittel>(LebensmittelModel))

lebensmittelRouter.put('/:id',
  validateAuthorization(BenutzerRolle.BENUTZER),
  validateRequest({params: genericParams, body: LebensmittelSchema}),
  genericPut<Lebensmittel>(LebensmittelModel))


lebensmittelRouter.get('/',
  validateAuthorization(BenutzerRolle.BENUTZER),
  findeLebensmittelController)

lebensmittelRouter.post('/many/',
  validateAuthorization(BenutzerRolle.ADMIN),
  validateRequest({body: z.array(LebensmittelSchema)}),
  importiereLebensmittelController)

lebensmittelRouter.delete('/many/:ids',
  validateAuthorization(BenutzerRolle.ADMIN),
  validateRequest({params: idListParams}),
  deleteManyLebensmittelController)

/*
lebensmittelRouter.delete('/:id',
  validateAuthorization(BenutzerRolle.ADMIN),
  validateRequest({params: genericParams}),
  genericDelete(LebensmittelModel))
*/
