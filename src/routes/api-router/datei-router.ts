import express, {Router} from "express";

import {requireUser} from "../../middleware/auth/require-user";
import {genericParams, validateRequest} from "../../middleware/validate-request";

import {Datei} from "../../shared-types/model/Datei";
import {DateiPatchSchema, DateiSucheSchema, DateiUploadSchema} from "../../shared-types/model/datei-schema";

import {DateiController} from "../../controllers/api-controller";
import {GenericController} from "../../controllers/generic-controller";
import {DateiModel} from "../../services/database-service";

const multer = require('multer')
const upload = multer({dest: './public/uploads/'})


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
  upload.array('bild', 1),
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
