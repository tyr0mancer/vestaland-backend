import express, {Router} from "express";
import {genericParams, validateRequest} from "../../middleware/validate-request";

import {GenericController} from "../../controllers/generic-controller";
import {RezeptSchema, RezeptSucheSchema} from "../../shared-types/model/rezept.schema";
import {Rezept} from "../../shared-types/model/Rezept";

import {requireUser} from "../../middleware/auth/require-user";
import {setOwnershipToRequestBody} from "../../middleware/set-ownership-to-request-body";
import {RezeptController} from "../../controllers/api-controller";
import {RezeptModel} from "../../services/database-service";


export const rezeptRouter: Router = express.Router();

rezeptRouter.get('/',
  validateRequest({query: RezeptSucheSchema}),
  RezeptController.search
)

rezeptRouter.get('/:id',
  validateRequest({params: genericParams}),
  GenericController.getById<Rezept>(RezeptModel)
)


rezeptRouter.delete('/:id',
  requireUser,
  validateRequest({params: genericParams}),
  GenericController.delete(RezeptModel, true)
)

rezeptRouter.post('/',
  requireUser,
  validateRequest({body: RezeptSchema}),
  setOwnershipToRequestBody,
  GenericController.post<Rezept>(RezeptModel)
)

rezeptRouter.put('/:id',
  requireUser,
  validateRequest({
    params: genericParams,
    body: RezeptSchema
  }),
  GenericController.put<Rezept>(RezeptModel, true)
)

