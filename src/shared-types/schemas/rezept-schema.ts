import {z} from "zod";

import {Tags} from "../enum";
import {RefType} from "./_ref-schema";
import {KochschrittSchema} from "./kochschritt-schema";
import {NutrientsSchema} from "./nutrients-schema";
import {ZutatSchema} from "./zutat-schema";
import {UtensilSchema} from "./utensil-schema";
import {DateiSchema} from "./datei-schema";

export const RezeptSchema = z.object({
  name: z.string().min(3, "Rezeptname muss mindestens 3 Zeichen lang sein").describe('Der Name des Rezeptes'),
  beschreibung: z.string().max(150, "Der Text ist viel zu lang. Bitte maximal 150 Zeichen.").optional().describe('Ein kurzer(!) Beschreibungstext'),
  freitext: z.string().optional().describe('Freitext Beschreibung des Rezeptes'),
  quelleUrl: z.array(z.string()).describe('Links zu Quellen oder andere Verweise'),
  schwierigkeitsgrad: z.number().min(1).max(5).optional(),
  realeGesamtdauer: z.number().optional(),
  realeArbeitszeit: z.number().optional(),
  berechneteGesamtdauer: z.number().optional(),
  berechneteArbeitszeit: z.number().optional(),
  extraPortionArbeitszeit: z.number().optional(),
  extraPortionGesamtdauer: z.number().optional(),
  portionen: z.number({required_error: "Die Anzahl an Portionen muss angegeben sein"}),
  nutrients: NutrientsSchema.optional(),
  kochschritte: z.array(KochschrittSchema),
  tags: z.array(z.nativeEnum(Tags)),
  utensilien: z.array(RefType(UtensilSchema)),
  zutaten: z.array(ZutatSchema),
  bild: RefType(DateiSchema).optional(),
}).strict()
export type RezeptType = z.infer<typeof RezeptSchema>;


export const RezeptSucheSchema = z.object({
  name: z.union([z.string().min(2), z.instanceof(RegExp)]).optional(),
  zutaten: z.string().optional(),
  tags: z.array(z.nativeEnum(Tags))
})

