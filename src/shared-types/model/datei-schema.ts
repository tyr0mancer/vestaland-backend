import {z} from "zod";

export const DateiSchema = z.object({
  originalname: z.string(),
  mimetype: z.string(),
  destination: z.string(),
  filename: z.string(),
  path: z.string(),
  size: z.number(),
  beschreibung: z.string().optional(),
}).strict()
export type DateiType = z.infer<typeof DateiSchema>;

export const DateiSucheSchema = z.object({
  beschreibung: z.union([z.string().min(2), z.instanceof(RegExp)]).optional()
}).strict()

export const DateiPatchSchema = z.object({
  beschreibung: z.string().optional()
}).strict()

/*

const FileSchema = z.object({
  mimetype: z.enum(['image/jpeg', 'image/gif', 'image/png', 'image/webp']),
})
export const DateiUploadSchema = z.object({
  bild: z.union([FileSchema, z.array(FileSchema).length(1)])
});
*/


export const DateiUploadSchema = z.any();


