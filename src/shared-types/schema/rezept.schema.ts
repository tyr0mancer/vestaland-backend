import {z} from "zod";

import {KochschrittSchema} from "./kochschritt.schema";
import {MongoExtension} from "./types";
import {NutrientsSchema} from "./nutrients.schema";


export const RezeptMetaSchema = z.object({
  vegetarisch: z.boolean().optional(),
  healthy: z.boolean().optional(),
  soulfood: z.boolean().optional(),
  schwierigkeitsgrad: z.number().optional()
})
export type RezeptMetaType = z.infer<typeof RezeptMetaSchema>;


export const RezeptSchema = z.object({
  name: z.string({required_error: "Das Rezept muss einen Namen enthalten"}).min(1).describe('Der Name des Rezeptes'),
  beschreibung: z.string().max(150).optional().describe('Ein kurzer(!) Beschreibungstext'),
  freitext: z.string().optional().describe('Freitext Beschreibung des Rezeptes'),
  quelleUrl: z.string().optional().array().describe('Links zu Quellen oder andere Verweise'),
  berechneteGesamtdauer: z.number().optional(),
  berechneteArbeitszeit: z.number().optional(),
  extraZeitExtraPortion: z.number().optional(),
  realeGesamtzeit: z.number().optional(),
  portionen: z.number({required_error: "Die Anzahl an Portionen muss angegeben sein"}),
  nutrients: NutrientsSchema.optional(),
  kochschritte: z.array(KochschrittSchema),
  meta: RezeptMetaSchema.optional(),

  autor: z.any().optional(),
  utensilien: z.array(z.any()),
  zutaten: z.array(z.any()),
  aktion: z.any().optional(),
  bild: z.any().optional(),

}).extend(MongoExtension).strict()


export type RezeptType = z.infer<typeof RezeptSchema>;

