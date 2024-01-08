import {z} from "zod";
import {Betriebsart} from "../enum";
import {ZutatSchema} from "./zutat.schema";

export const KochschrittSchema = z.object({
  aktion: z.any().optional(),
  beschreibung: z.string().optional(),
  videoUrl: z.string().optional(),
  repeating: z.boolean().optional(),
  gesamtdauer: z.number().optional(),
  arbeitszeit: z.number().optional(),
  wartezeit: z.number().optional(),
  zutaten: z.array(ZutatSchema),
  utensilien: z.array(z.any()),
  betriebsart: z.nativeEnum(Betriebsart).optional(),
  temperatur: z.number().optional(),

}).strict()

export type KochschrittType = z.infer<typeof KochschrittSchema>;

