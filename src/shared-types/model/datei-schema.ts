import {z} from "zod";

export const DateiSchema = z.object({
  fileNameServer: z.string(),
  fileNameOriginal: z.string(),
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


export const DateiUploadSchema = z.array(z.object({
  // Name des Dateifelds im Formular
  fieldname: z.string(),

  // Dateiname der hochgeladenen Datei
  originalname: z.string(),

  // MIME-Typ der Datei
  mimetype: z.string(),

  // Größe der Datei in Bytes
  size: z.number(),

  // Pfad zur temporären Datei auf dem Server (kann variieren)
  path: z.string(),

  // Buffer-Objekt mit den Dateidaten
  buffer: z.instanceof(Buffer),
}))
