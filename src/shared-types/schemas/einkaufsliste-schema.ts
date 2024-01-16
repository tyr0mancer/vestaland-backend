import {z} from "zod";
import {RefType} from "./_ref-schema";
import {BenutzerSchema} from "./benutzer-schema";
import {ZutatSchema} from "./zutat-schema";
import {ProduktSchema} from "./produkt-schema";
import {RezeptSchema} from "./rezept-schema";


export const EinkaufslistenEintragSchema = z.object({
  zutat: ZutatSchema.optional(),
  produkt: ProduktSchema.optional(),
  rezept: RefType(RezeptSchema).optional(),
  zuKaufenBis: z.date().optional(),
  wichtigkeit: z.number().min(1).max(3),
  ladenGruppe: z.string().optional()
});
export type EinkaufslistenEintragType = z.infer<typeof EinkaufslistenEintragSchema>;


/**
 * Definiert das Hauptvalidierungsschema für Einkaufsliste
 */
export const EinkaufslisteSchema = z.object({
  listenName: z.string().min(2),
  beschreibung: z.string().optional(),
  sharedWith: z.array(RefType(BenutzerSchema)),
  eintraege: z.array(EinkaufslistenEintragSchema),
});
export type EinkaufslisteType = z.infer<typeof EinkaufslisteSchema>;


