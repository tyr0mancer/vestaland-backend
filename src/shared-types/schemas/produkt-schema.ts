import {z} from "zod";
import {RefType} from "./_ref-schema";
import {Einheit, HaendlerGruppe} from "../enum";
import {HaendlerSchema} from "./haendler-schema";
import {LebensmittelSchema} from "./lebensmittel-schema";
import {MongoDocumentSchema} from "./_mongo-document-schema";

export const ProduktSchema = MongoDocumentSchema.extend({
  freitext: z.string().optional(),
  lebensmittel: RefType(LebensmittelSchema).optional(),
  menge: z.number(),
  einheit: z.nativeEnum(Einheit),
  barcode: z.string().optional(),
  ladenTyp: z.array(z.nativeEnum(HaendlerGruppe)),
  ladenListe: z.array(RefType(HaendlerSchema))
}).strict();

export type ProduktType = z.infer<typeof ProduktSchema>;
