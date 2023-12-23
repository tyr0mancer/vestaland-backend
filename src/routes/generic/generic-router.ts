import express, {Router} from "express";
import {ReturnModelType} from "@typegoose/typegoose/lib/types";
import {z} from "zod";

import {validateRequest} from "../../middleware/validate-request";
import {mongoose} from "@typegoose/typegoose";
import {genericDelete, genericGet, genericPost, genericPut, genericSearch} from "../../controllers/generic-controller";
import {validateAuthorization} from "../../middleware/validate-authorization";
import {BenutzerRolle} from "../../types";

const genericParams = z.object({_id: z.custom<mongoose.Types.ObjectId>()})

export function genericRouter<T>(genericModel: ReturnModelType<any>, genericSchema: z.ZodObject<any>) {
  const router: Router = express.Router();

  router.get('',
    genericSearch<T>(genericModel))

  router.get('/:id',
    validateRequest({params: genericParams}),
    genericGet<T>(genericModel))

  router.post('/',
    validateAuthorization(BenutzerRolle.BENUTZER),
    validateRequest({body: genericSchema}),
    genericPost<T>(genericModel))

  router.delete('/:id',
    validateAuthorization(BenutzerRolle.BENUTZER),
    validateRequest({params: genericParams}),
    genericDelete(genericModel))

  router.put('/:id', validateAuthorization(BenutzerRolle.BENUTZER),
    validateRequest({params: genericParams, body: genericSchema}),
    genericPut<T>(genericModel))

  return router
}
