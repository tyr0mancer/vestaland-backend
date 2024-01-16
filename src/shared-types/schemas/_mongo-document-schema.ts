import {z} from "zod";

/**
 * SchemaDefinition um MongoDB typische Properties als optional hinzuzufügen
 */
export const MongoDocumentSchema = {
  _id: z.string().optional(),
  __v: z.number().optional(),
  updatedAt: z.any().optional(),
  createdAt: z.any().optional(),
}
