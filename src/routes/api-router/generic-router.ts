import express, {Router} from "express";
import {ReturnModelType} from "@typegoose/typegoose/lib/types";
import {mongoose} from "@typegoose/typegoose";
import {z} from "zod";

import {validateRequest} from "../../middleware/validate-request";
import {GenericController} from "../../controllers/generic-controller";
import {setOwnershipToRequestBody} from "../../middleware/set-ownership-to-request-body";
import {requireUser} from "../../middleware/auth/require-user";

const genericParams = z.object({_id: z.custom<mongoose.Types.ObjectId>()})

/**
 * Implementiert folgende CRUD Sub-Routes
 *
 * get('/', validateRequest({query: SucheSchema}), ... ): T[]
 * get('/:id', ... ): T
 * delete('/:id', ... ): void
 * post('/', validateRequest({body: BodySchema}), ... ): T
 * put('/:id', validateRequest({body: BodySchema}), ... ): T
 * patch('/:id', validateRequest({body: UpdateSchema}), ...): T
 *
 * @see GenericController
 *
 * @param MongoModel
 * @param BodySchema
 * @param SucheSchema
 * @param regExProps  props in SucheSchema
 */
export function genericRouter<T>(MongoModel: ReturnModelType<any>, BodySchema: z.ZodObject<any>, SucheSchema?: z.ZodObject<any> | null, regExProps = ['name']) {
  const router: Router = express.Router();
  if (!SucheSchema)
    SucheSchema = z.object({})

  router.get('/', requireUser, validateRequest({query: SucheSchema}), GenericController.search<T>(MongoModel, regExProps, true))
  router.get('/:id', requireUser, validateRequest({params: genericParams}), GenericController.getById<T>(MongoModel))
  router.delete('/:id', requireUser, validateRequest({params: genericParams}), GenericController.delete(MongoModel, true))
  router.post('/', requireUser, validateRequest({body: BodySchema}), setOwnershipToRequestBody, GenericController.post<T>(MongoModel))
  router.put('/:id', requireUser, validateRequest({
    params: genericParams,
    body: BodySchema
  }), setOwnershipToRequestBody, GenericController.put<T>(MongoModel, true))
  return router
}
