import {z} from "zod";
import {AktionIcon} from "../enum";
import {MongoDocumentSchema} from "./_mongo-document-schema";

export const KochschrittAktionSchema = MongoDocumentSchema.extend({
  aktionName: z.string(),
  aktionIcon: z.nativeEnum(AktionIcon),
}).strict();

export type KochschrittAktionType = z.infer<typeof KochschrittAktionSchema>;

