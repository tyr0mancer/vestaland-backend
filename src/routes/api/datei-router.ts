import express, {Router} from "express";

import {deleteFile, searchDatei, uploadFile} from "../../controllers/api/datei.controller";
import {GenericController} from "../../controllers/generic/generic-controller";
import {genericParams, validateRequest} from "../../middleware/validate-request";
import {authenticateToken} from "../../middleware/authenticate-token";
import {setOwnershipToRequestBody} from "../../middleware/set-ownership-to-request-body";
import {DateiPatchSchema, DateiSchema, DateiSucheSchema} from "../../shared-types/schema/datei-schema";
import {Lebensmittel} from "../../shared-types/schema/Lebensmittel";
import {DateiModel} from "../../db-model";

export const dateiRouter: Router = express.Router();

dateiRouter.get('/',
  authenticateToken,
  validateRequest({query: DateiSucheSchema}),
  searchDatei
)

dateiRouter.delete('/:id',
  authenticateToken,
  validateRequest({params: genericParams}),
  deleteFile
)

dateiRouter.post('/',
  authenticateToken,
  validateRequest({body: DateiSchema}),
  uploadFile
)

dateiRouter.patch('/:id',
  authenticateToken,
  validateRequest({
    params: genericParams,
    body: DateiPatchSchema
  }),
  setOwnershipToRequestBody,
  GenericController.patch<Lebensmittel>(DateiModel, true)
)
