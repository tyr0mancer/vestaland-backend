import express, {Router} from "express";
import {genericParams, validateRequest} from "../../middleware/validate-request";

import {GenericController} from "../../controllers/generic-controller";
import {RezeptPutSchema, RezeptSchema, RezeptSucheSchema} from "../../shared-types/schemas/rezept-schema";
import {Rezept} from "../../shared-types/models/Rezept";

import {requireUser} from "../../middleware/auth/require-user";
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
  GenericController.delete(RezeptModel)
)

rezeptRouter.post('/',
  requireUser,
  validateRequest({body: RezeptSchema}),
  RezeptController.post,
)

rezeptRouter.put('/:id',
  requireUser,
  validateRequest({
    params: genericParams,
    body: RezeptPutSchema
  }),
  GenericController.put<Rezept>(RezeptModel)
)

