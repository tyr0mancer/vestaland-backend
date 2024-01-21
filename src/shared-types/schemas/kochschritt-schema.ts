import {z} from "zod";
import {RefType} from "./_ref-schema";
import {Betriebsart} from "../enum";
import {ZutatSchema} from "./zutat-schema";
import {UtensilSchema} from "./utensil-schema";
import {KochschrittAktionSchema} from "./kochschritt-aktion-schema";

export const KochschrittSchema = z.object({
  aktionen: z.array(RefType(KochschrittAktionSchema)),
  beschreibung: z.string().optional(),
  quelleUrl: z.string().optional(),
  repeating: z.boolean().optional(),
  gesamtdauer: z.number().optional(),
  arbeitszeit: z.number().optional(),
  wartezeit: z.number().optional(),
  wartenErforderlich: z.boolean().optional(),
  zutaten: z.array(ZutatSchema),
  utensilien: z.array(RefType(UtensilSchema)),
  betriebsart: z.nativeEnum(Betriebsart).optional(),
  temperatur: z.number().optional(),
  _id: z.string().optional(),
  ergebnisName: z.string().optional(),
  erforderlicheErgebnisse: z.array(z.string()),
  totalWeight: z.number().optional(),
  totalVolume: z.number().optional(),
}).strict()

export type KochschrittType = z.infer<typeof KochschrittSchema>;
