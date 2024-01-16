import {z} from "zod";
import {Einheit, HaendlerGruppe, LebensmittelKategorie} from "../enum";
import {NutrientsSchema} from "./nutrients-schema";

export const LebensmittelSchema = z.object({
  name: z.string().min(2, "Der Lebensmittel-Namen muss mindestens 2 Zeichen lang sein"),
  nameDetail: z.string().optional(),
  nameSingular: z.string().optional(),
  beschreibung: z.string().optional(),
  defaultEinheit: z.nativeEnum(Einheit),
  defaultMenge: z.number().optional(),
  nutrients: NutrientsSchema.optional(),

  kategorie: z.nativeEnum(LebensmittelKategorie).optional(),
  defaultAbteilung: z.string().optional(),

  haendlerGruppen: z.array(z.nativeEnum(HaendlerGruppe)),
  // Austausch: z.array(LebensmittelAustauschSchema),

  density: z.number().optional(),
  unitWeight: z.number().optional()
}).strict()
export type LebensmittelType = z.infer<typeof LebensmittelSchema>;


export const LebensmittelSucheSchema = z.object({
  name: z.union([z.string().min(2), z.instanceof(RegExp)]).optional(),
  schwierigkeitsgrad: z.string().optional(),
}).strict()
export type LebensmittelSucheType = z.infer<typeof LebensmittelSucheSchema>;
