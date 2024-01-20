import {z} from "zod";
import {HaendlerGruppe} from "../enum";
import {MongoDocumentSchema} from "./_mongo-document-schema";

export const HaendlerSchema = MongoDocumentSchema.extend({
  haendlerName: z.string(),
  haendlerGruppe: z.nativeEnum(HaendlerGruppe),
  abteilungOrdnung: z.array(z.string()),
  geoData: z.string().optional(),
})

export type HaendlerType = z.infer<typeof HaendlerSchema>;
