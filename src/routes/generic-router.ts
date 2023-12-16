import express, {Router} from "express";
import {ReturnModelType} from "@typegoose/typegoose/lib/types";
import {z} from "zod";

import {validateRequest} from "../middleware/validate-request";
import {mongoose} from "@typegoose/typegoose";

export const genericParamsSchema = z.object({
  params: z.object({
    _id: z.custom<mongoose.Types.ObjectId>(),
  }),
});

export function genericRouter<T>(genericModel: ReturnModelType<any>, schema: z.ZodObject<any>) {
  const router: Router = express.Router();

  // Search for Document with similar name attribute
  router.get('/',
    async (req, res) => {
      let query: { [key: string]: any } = {};

      if (req.query.name && typeof req.query.name == "string") {
        query.name = new RegExp(req.query.name, 'i');
      }

      try {
        const response = await genericModel.find(query);
        res.status(200).json(response).send();
      } catch (error) {
        res.status(500).json(error).send();
      }
    })

  // Get specific Document
  router.get('/:id',
    validateRequest(genericParamsSchema),
    (req, res) =>
      genericModel.findById(req.params.id)
        .then((response: T) => {
          if (!response)
            return res.status(404).send();
          res.status(200).json(response).send()
        })
        .catch((error: any) => res.status(500).json(error).send())
  )

  // Post new Document
  router.post('/',
    validateRequest(schema),
    (req, res) =>
      genericModel.create(req.body)
        .then((response: T) => res.status(201).json(response).send())
        .catch((error: any) => res.status(500).json(error).send())
  )

  // Update Document
  router.put('/:id',
    validateRequest(genericParamsSchema),
    validateRequest(schema),
    (req, res) => {
      genericModel.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true
      })
        .then((response: any) => {
          if (!response)
            return res.status(404).send();
          res.status(200).json(response).send()
        })
        .catch((error: any) => res.status(500).json(error).send())
    })


  // Delete Document
  router.delete('/:id',
    validateRequest(genericParamsSchema),
    (req, res) =>
      genericModel.findOneAndDelete({_id: req.params.id})
        .then((response: any) => {
          if (!response)
            return res.status(404).send();
          res.status(200).send("DELETED");
        })
        .catch((error: any) => res.status(500).json(error).send())
  )

  return router
}
