import express, {Router} from "express";
import {ReturnModelType} from "@typegoose/typegoose/lib/types";
import {mongoose} from "@typegoose/typegoose";
import {z} from "zod";

import {validateRequest} from "../../middleware/validate-request";
import {GenericController} from "../../controllers/generic/generic-controller";
import {authenticateToken} from "../../middleware/authenticate-token";
import {setOwnershipToRequestBody} from "../../middleware/set-ownership-to-request-body";

const genericParams = z.object({_id: z.custom<mongoose.Types.ObjectId>()})

export function genericRouter<T>(MongoModel: ReturnModelType<any>, BodySchema: z.ZodObject<any>, SucheSchema?: z.ZodObject<any> | null, regExProps = ['name']) {
  const router: Router = express.Router();
  if (!SucheSchema)
    SucheSchema = z.object({})

  router.get('/', authenticateToken, validateRequest({query: SucheSchema}), GenericController.search<T>(MongoModel, regExProps, true))
  router.get('/:id', authenticateToken, validateRequest({params: genericParams}), GenericController.getById<T>(MongoModel))
  router.delete('/:id', authenticateToken, validateRequest({params: genericParams}), GenericController.delete(MongoModel, true))
  router.post('/', authenticateToken, validateRequest({body: BodySchema}), setOwnershipToRequestBody, GenericController.post<T>(MongoModel))
  router.put('/:id', authenticateToken, validateRequest({
    params: genericParams,
    body: BodySchema
  }), setOwnershipToRequestBody, GenericController.put<T>(MongoModel, true))
  return router
}
