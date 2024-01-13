import {z} from "zod";

export const DateiSchema = z.object({
  dateiNameServer: z.string(),
  dateiNameOriginal: z.string(),
  beschreibung: z.string().optional(),
  fileSize: z.number()
}).strict()
export type DateiType = z.infer<typeof DateiSchema>;

export const DateiSucheSchema = z.object({
  beschreibung: z.union([z.string().min(2), z.instanceof(RegExp)]).optional()
}).strict()

export const DateiPatchSchema = z.object({
  beschreibung: z.string().optional()
}).strict()
