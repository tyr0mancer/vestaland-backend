import express, {Router} from "express";

import {requireUser} from "../../middleware/auth/require-user";
import {Datei} from "../../shared-types/model/Datei";
import {DateiController} from "../../controllers/api-controller";
import {GenericController} from "../../controllers/generic-controller";
import {genericParams, validateRequest} from "../../middleware/validate-request";
import {DateiPatchSchema, DateiSucheSchema, DateiUploadSchema} from "../../shared-types/model/datei-schema";
import {DateiModel} from "../../services/database-service";


export const dateiRouter: Router = express.Router();

dateiRouter.get('/',
  requireUser,
  validateRequest({query: DateiSucheSchema}),
  GenericController.search<Datei>(DateiModel, ['fileNameOriginal', 'beschreibung'], true)
)

dateiRouter.get('/:id',
  requireUser,
  validateRequest({params: genericParams}),
  GenericController.getById<Datei>(DateiModel)
)

dateiRouter.delete('/:id',
  requireUser,
  validateRequest({params: genericParams}),
  DateiController.delete
)

dateiRouter.post('/',
  requireUser,
  validateRequest({files: DateiUploadSchema}),
  DateiController.post
)

dateiRouter.patch('/:id',
  requireUser,
  validateRequest({
    params: genericParams,
    body: DateiPatchSchema
  }),
  GenericController.patch<Datei>(DateiModel, true)
)
