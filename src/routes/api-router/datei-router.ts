import express, {Router} from "express";

import {requireUser} from "../../middleware/auth/require-user";
import {genericParams, validateRequest} from "../../middleware/validate-request";

import {Datei} from "../../shared-types/models/Datei";
import {DateiPatchSchema, DateiSucheSchema, DateiUploadSchema} from "../../shared-types/schemas/datei-schema";

import {DateiController} from "../../controllers/api-controller";
import {GenericController} from "../../controllers/generic-controller";
import {DateiModel} from "../../services/database-service";
import {uploadFile} from "../../middleware/upload-files";
import {requireAdmin} from "../../middleware/auth/require-admin";


export const dateiRouter: Router = express.Router();

dateiRouter.get('/',
  requireUser,
  validateRequest({query: DateiSucheSchema}),
  DateiController.list
)

/*
dateiRouter.get('/:id',
  requireUser,
  validateRequest({params: genericParams}),
  GenericController.getById<Datei>(DateiModel)
)
*/

dateiRouter.delete('/:id',
  requireUser,
  validateRequest({params: genericParams}),
  DateiController.delete
)

dateiRouter.post('/',
  requireUser,
  uploadFile.array('bild', 1),
  validateRequest({files: DateiUploadSchema}),
  DateiController.post
)

dateiRouter.patch('/:id',
  requireUser,
  requireAdmin,
  validateRequest({
    params: genericParams,
    body: DateiPatchSchema
  }),
  GenericController.patch<Datei>(DateiModel)
)
