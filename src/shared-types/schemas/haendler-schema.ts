import {z} from "zod";
import {HaendlerGruppe} from "../enum";

export const HaendlerSchema = z.object({
  haendlerName: z.string(),
  haendlerGruppe: z.nativeEnum(HaendlerGruppe),
  abteilungOrdnung: z.array(z.string()),
  geoData: z.string().optional(),
})

export type HaendlerType = z.infer<typeof HaendlerSchema>;
