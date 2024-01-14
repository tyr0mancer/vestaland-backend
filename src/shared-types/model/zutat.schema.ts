import {z} from "zod";
import {Einheit} from "../enum";

export const ZutatSchema = z.object({
  lebensmittel: z.any(),
  freitext: z.string().optional(),
  einheit: z.nativeEnum(Einheit),
  menge: z.number(),
}).strict()

export type ZutatType = z.infer<typeof ZutatSchema>;

