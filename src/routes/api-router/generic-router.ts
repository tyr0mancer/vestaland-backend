import express, {Router} from "express";
import {ReturnModelType} from "@typegoose/typegoose/lib/types";
import {mongoose} from "@typegoose/typegoose";
import {z} from "zod";

import {validateRequest} from "../../middleware/validate-request";
import {requireUser} from "../../middleware/auth/require-user";
import {GenericController} from "../../controllers/generic-controller";
import {requireRole} from "../../middleware/auth/require-role";
import {BenutzerRolle} from "../../shared-types/enum";

const genericParams = z.object({_id: z.custom<mongoose.Types.ObjectId>()})


interface ValidationSchemas {
  post: z.ZodObject<any>,
  put?: z.ZodObject<any>,
  patch?: z.ZodObject<any>,
  search: z.ZodObject<any>
}

//@hausarbeit
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
 * @param MongoDbModel
 * @param validationSchemas
 * @param regExProps  props in SucheSchema
 */
export function genericRouter<T>(MongoDbModel: ReturnModelType<any>,
                                 validationSchemas: ValidationSchemas,
                                 regExProps: (keyof T)[] = []) {

  const router: Router = express.Router();

  /**
   * Search
   */
  router.get('/',
    requireUser,
    validateRequest({query: validationSchemas.search}),
    GenericController.search<T>(MongoDbModel, regExProps as string[])
  )

  /**
   * GetById
   */
  router.get('/:id',
    requireUser,
    validateRequest({params: genericParams}),
    GenericController.getById<T>(MongoDbModel)
  )

  /**
   * Delete
   */
  router.delete('/:id',
    requireRole(BenutzerRolle.REDAKTEUR),
    validateRequest({params: genericParams}),
    GenericController.delete(MongoDbModel)
  )

  /**
   * Post
   */
  router.post('/',
    requireRole(BenutzerRolle.REDAKTEUR),
    validateRequest({body: validationSchemas.post}),
    GenericController.post<T>(MongoDbModel)
  )

  /**
   * Replace
   */
  router.put('/:id',
    requireRole(BenutzerRolle.REDAKTEUR),
    validateRequest({
      params: genericParams,
      body: validationSchemas.put
    }),
    GenericController.put<T>(MongoDbModel)
  )

  /**
   * Update
   */
  router.patch('/:id',
    requireRole(BenutzerRolle.REDAKTEUR),
    validateRequest({
      params: genericParams,
      body: validationSchemas.patch
    }),
    GenericController.patch<T>(MongoDbModel)
  )
  return router
}
