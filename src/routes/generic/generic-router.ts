import express, {Router} from "express";
import {ReturnModelType} from "@typegoose/typegoose/lib/types";
import {mongoose} from "@typegoose/typegoose";
import {z} from "zod";

import {BenutzerRolle} from "../../shared-types/enum";
import {validateRequest} from "../../middleware/validate-request";
import {validateAuthorization} from "../../middleware/validate-authorization";
import {genericDelete, genericGet, genericPost, genericPut, genericSearch} from "../../controllers/generic-controller";

const genericParams = z.object({_id: z.custom<mongoose.Types.ObjectId>()})

export function genericRouter<T>(genericModel: ReturnModelType<any>, genericSchema: z.ZodObject<any>) {
  const router: Router = express.Router();

  router.get('',
    validateAuthorization(BenutzerRolle.BENUTZER),
    genericSearch<T>(genericModel))

  router.get('/:id',
    validateAuthorization(BenutzerRolle.BENUTZER),
    validateRequest({params: genericParams}),
    genericGet<T>(genericModel))

  router.post('/',
    validateAuthorization(BenutzerRolle.BENUTZER),
    validateRequest({body: genericSchema}),
    genericPost<T>(genericModel))

  router.put('/:id',
    validateAuthorization(BenutzerRolle.BENUTZER),
    validateRequest({params: genericParams, body: genericSchema}),
    genericPut<T>(genericModel))

  router.delete('/:id',
    validateAuthorization(BenutzerRolle.BENUTZER),
    validateRequest({params: genericParams}),
    genericDelete(genericModel))

  return router
}
