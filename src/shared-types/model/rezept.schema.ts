import {z} from "zod";

import {KochschrittSchema} from "./kochschritt.schema";
import {MongoExtension} from "../model-helper";
import {NutrientsSchema} from "./nutrients.schema";
import {Tags} from "../enum/Tags";

export const RezeptSchema = z.object({
  name: z.string().min(3, "Rezeptname muss mindestens 3 Zeichen lang sein").describe('Der Name des Rezeptes'),
  beschreibung: z.string().max(150, "Der Text ist viel zu lang. Bitte maximal 150 Zeichen.").optional().describe('Ein kurzer(!) Beschreibungstext'),
  freitext: z.string().optional().describe('Freitext Beschreibung des Rezeptes'),
  quelleUrl: z.string().optional().array().describe('Links zu Quellen oder andere Verweise'),
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
  autor: z.any().optional(),
  utensilien: z.array(z.any()),
  zutaten: z.array(z.any()),
  aktion: z.any().optional(),
  bild: z.any().optional(),
}).extend(MongoExtension).strict()


export type RezeptType = z.infer<typeof RezeptSchema>;

export const RezeptSucheSchema = z.object({
  name: z.string().optional(),
  zutaten: z.string().optional(),
  myRecipes: z.boolean().optional(),

  vegetarisch: z.boolean().optional(),
  healthy: z.boolean().optional(),
  soulfood: z.boolean().optional(),
})
