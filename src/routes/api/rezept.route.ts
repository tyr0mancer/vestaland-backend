import express, {Router} from "express";
import {genericParams, validateRequest} from "../../middleware/validate-request";
import {
  findeRezeptController,
  getRezeptDetailController,
  postRezept
} from "../../controllers/api/rezept.controller";
import {readToken} from "../../middleware/read-token";
import {RezeptSchema, RezeptSucheSchema} from "../../shared-types/schema/rezept.schema";
import {authenticateToken} from "../../middleware/authenticate-token";
import {GenericController} from "../../controllers/generic/generic-controller";
import {setOwnershipToRequestBody} from "../../middleware/set-ownership-to-request-body";
import {RezeptModel} from "../../db-model";
import {Rezept} from "../../shared-types/schema/Rezept";


export const rezeptRouter: Router = express.Router();

rezeptRouter.get('/', readToken, validateRequest({query: RezeptSucheSchema}), findeRezeptController)
rezeptRouter.get('/:id', validateRequest({params: genericParams}), getRezeptDetailController)
rezeptRouter.delete('/:id', authenticateToken, validateRequest({params: genericParams}),
  GenericController.delete(RezeptModel, true))

rezeptRouter.post('/', authenticateToken, validateRequest({body: RezeptSchema}), postRezept)
rezeptRouter.put('/:id', readToken, validateRequest({params: genericParams, body: RezeptSchema}),
  setOwnershipToRequestBody, GenericController.put<Rezept>(RezeptModel, true))
