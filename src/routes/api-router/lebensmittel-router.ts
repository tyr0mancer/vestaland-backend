import express, {Router} from "express";

import {requireUser} from "../../middleware/auth/require-user";
import {genericParams, validateRequest} from "../../middleware/validate-request";
import {GenericController} from "../../controllers/generic-controller";

import {Lebensmittel} from "../../shared-types/models/Lebensmittel";
import {LebensmittelModel} from "../../services/database-service";
import {LebensmittelSchema, LebensmittelSucheSchema} from "../../shared-types/schemas/lebensmittel-schema";

export const lebensmittelRouter: Router = express.Router();

lebensmittelRouter.get('/',
  requireUser,
  validateRequest({query: LebensmittelSucheSchema}),
  GenericController.search<Lebensmittel>(LebensmittelModel, ['name'])
)

lebensmittelRouter.get('/:id',
  requireUser,
  validateRequest({params: genericParams}),
  GenericController.getById<Lebensmittel>(LebensmittelModel)
)

lebensmittelRouter.delete('/:id',
  requireUser,
  validateRequest({params: genericParams}),
  GenericController.delete(LebensmittelModel)
)

lebensmittelRouter.post('/',
  requireUser,
  validateRequest({body: LebensmittelSchema}),
  GenericController.post<Lebensmittel>(LebensmittelModel)
)

lebensmittelRouter.put('/:id',
  requireUser,
  validateRequest({
    params: genericParams,
    body: LebensmittelSchema
  }),
  GenericController.put<Lebensmittel>(LebensmittelModel)
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
