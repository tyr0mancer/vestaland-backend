import express, {Router} from "express";

import {validateAuthorization} from "../../middleware/validate-authorization";
import {deleteFile, searchDatei, uploadFile} from "../../controllers/datei.controller";
import {genericParams, validateRequest} from "../../middleware/validate-request";

export const dateiRouter: Router = express.Router();

dateiRouter.get('/',
  validateAuthorization(),
  searchDatei)

dateiRouter.post('/',
  validateAuthorization(),
  uploadFile)

dateiRouter.delete('/:id',
  validateAuthorization(),
  validateRequest({params: genericParams}),
  deleteFile)
