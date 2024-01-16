import {z} from "zod";
import {RefType} from "./_ref-schema";
import {BenutzerSchema} from "./benutzer-schema";

export const CustomOwnershipSchema = z.object({
  owner: RefType(BenutzerSchema).optional(),
  publicVisible: z.boolean().optional()
}).strict()

export type CustomOwnershipType = z.infer<typeof CustomOwnershipSchema>;
