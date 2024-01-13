import express, {Router} from "express";
import {genericParams, validateRequest} from "../../middleware/validate-request";
import {Lebensmittel} from "../../shared-types/schema/Lebensmittel";

import {GenericController} from "../../controllers/generic/generic-controller";
import {LebensmittelModel} from "../../db-model";
import {LebensmittelSchema, LebensmittelSucheSchema} from "../../shared-types/schema/lebensmittel.schema";
import {authenticateToken} from "../../middleware/authenticate-token";
import {setOwnershipToRequestBody} from "../../middleware/set-ownership-to-request-body";

export const lebensmittelRouter: Router = express.Router();

lebensmittelRouter.get('/',
  authenticateToken,
  validateRequest({query: LebensmittelSucheSchema}),
  GenericController.search<Lebensmittel>(LebensmittelModel, ['name'], true)
)

lebensmittelRouter.get('/:id',
  authenticateToken,
  validateRequest({params: genericParams}),
  GenericController.getById<Lebensmittel>(LebensmittelModel)
)

lebensmittelRouter.delete('/:id',
  authenticateToken,
  validateRequest({params: genericParams}),
  GenericController.delete(LebensmittelModel, true)
)

lebensmittelRouter.post('/',
  authenticateToken,
  validateRequest({body: LebensmittelSchema}),
  setOwnershipToRequestBody,
  GenericController.post<Lebensmittel>(LebensmittelModel)
)

lebensmittelRouter.put('/:id',
  authenticateToken,
  validateRequest({
    params: genericParams,
    body: LebensmittelSchema
  }),
  GenericController.put<Lebensmittel>(LebensmittelModel, true))


/*
lebensmittelRouter.post('/many/',
  validateAuthorization(BenutzerRolle.ADMIN),
  validateRequest({body: z.array(LebensmittelSchema)}),
  importiereLebensmittelController)

lebensmittelRouter.delete('/many/:ids',
  validateAuthorization(BenutzerRolle.ADMIN),
  validateRequest({params: idListParams}),
  deleteManyLebensmittelController)
*/
