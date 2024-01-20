import {z} from "zod";
import {RefType} from "./_ref-schema";
import {BenutzerSchema} from "./benutzer-schema";
import {MongoDocumentSchema} from "./_mongo-document-schema";

export const CustomOwnershipSchema = MongoDocumentSchema.extend({
  owner: RefType(BenutzerSchema).optional(),
  publicVisible: z.boolean().optional()
}).strict()

export type CustomOwnershipType = z.infer<typeof CustomOwnershipSchema>;
