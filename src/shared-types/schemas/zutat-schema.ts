import {z} from "zod";
import {RefType} from "./_ref-schema";
import {Einheit} from "../enum";
import {LebensmittelSchema} from "./lebensmittel-schema";

export const ZutatSchema = z.object({
  lebensmittel: RefType(LebensmittelSchema).optional(),
  freitext: z.string().optional(),
  einheit: z.nativeEnum(Einheit),
  menge: z.number(),
}).strict()

export type ZutatType = z.infer<typeof ZutatSchema>;
