import express, {Router} from "express";

import {BenutzerModel} from "../../services/database-service";
import {requireAdmin} from "../../middleware/auth/require-admin";
import {validateRequest, genericParams} from "../../middleware/validate-request";
import {GenericController} from "../../controllers/generic-controller";
import {Benutzer} from "../../shared-types/model/Benutzer";
import {
  BenutzerPatchSchema,
  RegisterSchema,
  UpdateProfileSchema
} from "../../shared-types/model/benutzer-schema";
import {BenutzerController} from "../../controllers/api-controller";
import {requireUser} from "../../middleware/auth/require-user";


export const benutzerRouter: Router = express.Router();

/* ******************************* Interaktion mit User ******************************* */

benutzerRouter.post('/register',
  validateRequest({body: RegisterSchema}),
  BenutzerController.register
)

benutzerRouter.put('/update-profile',
  requireUser,
  validateRequest({body: UpdateProfileSchema}),
  BenutzerController.updateProfile
)


/* ******************************* Nur durch Admin ******************************* */

benutzerRouter.get('/:id',
  requireAdmin,
  validateRequest({params: genericParams}),
  GenericController.getById<Benutzer>(BenutzerModel)
)

benutzerRouter.get('/',
  requireAdmin,
  GenericController.search(BenutzerModel, ['name', 'email'])
)

benutzerRouter.patch('/:id',
  requireAdmin,
  validateRequest({
    params: genericParams,
    body: BenutzerPatchSchema
  }),
  GenericController.patch<Benutzer>(BenutzerModel)
)

benutzerRouter.delete('/:id',
  requireAdmin,
  validateRequest({params: genericParams}),
  GenericController.delete(BenutzerModel)
)

