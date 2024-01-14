import express, {Router} from "express";
import {genericParams, validateRequest} from "../../middleware/validate-request";
import {Lebensmittel} from "../../shared-types/model/Lebensmittel";

import {GenericController} from "../../controllers/generic-controller";
import {LebensmittelModel} from "../../services/database-service";
import {LebensmittelSchema, LebensmittelSucheSchema} from "../../shared-types/model/lebensmittel.schema";
import {setOwnershipToRequestBody} from "../../middleware/set-ownership-to-request-body";
import {requireUser} from "../../middleware/auth/require-user";

export const lebensmittelRouter: Router = express.Router();

lebensmittelRouter.get('/',
  requireUser,
  validateRequest({query: LebensmittelSucheSchema}),
  GenericController.search<Lebensmittel>(LebensmittelModel, ['name'], true)
)

lebensmittelRouter.get('/:id',
  requireUser,
  validateRequest({params: genericParams}),
  GenericController.getById<Lebensmittel>(LebensmittelModel)
)

lebensmittelRouter.delete('/:id',
  requireUser,
  validateRequest({params: genericParams}),
  GenericController.delete(LebensmittelModel, true)
)

lebensmittelRouter.post('/',
  requireUser,
  validateRequest({body: LebensmittelSchema}),
  setOwnershipToRequestBody,
  GenericController.post<Lebensmittel>(LebensmittelModel)
)

lebensmittelRouter.put('/:id',
  requireUser,
  validateRequest({
    params: genericParams,
    body: LebensmittelSchema
  }),
  GenericController.put<Lebensmittel>(LebensmittelModel, true)
)


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
