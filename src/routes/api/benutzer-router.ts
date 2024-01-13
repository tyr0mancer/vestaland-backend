import express, {Router} from "express";

import {BenutzerModel} from "../../db-model";
import {checkAdminRole} from "../../middleware/check-admin-role";
import {authenticateToken} from "../../middleware/authenticate-token";
import {validateRequest, genericParams} from "../../middleware/validate-request";
import {GenericController} from "../../controllers/generic/generic-controller";
import {Benutzer} from "../../shared-types/schema/Benutzer";
import {BenutzerPatchSchema} from "../../shared-types/schema/benutzer.schema";


export const benutzerRouter: Router = express.Router();

benutzerRouter.get('/:id',
  authenticateToken,
  checkAdminRole,
  validateRequest({params: genericParams}),
  GenericController.getById<Benutzer>(BenutzerModel)
)

benutzerRouter.get('/',
  authenticateToken,
  checkAdminRole,
  GenericController.search(BenutzerModel, ['name', 'email'])
)

benutzerRouter.patch('/:id',
  authenticateToken,
  checkAdminRole,
  validateRequest({
    params: genericParams,
    body: BenutzerPatchSchema
  }),
  GenericController.patch<Benutzer>(BenutzerModel)
)

benutzerRouter.delete('/:id',
  authenticateToken,
  checkAdminRole,
  validateRequest({params: genericParams}),
  GenericController.delete(BenutzerModel)
)
