import {z} from "zod";
import {AktionIcon} from "../enum";

export const KochschrittAktionSchema = z.object({
  aktionName: z.string(),
  aktionIcon: z.nativeEnum(AktionIcon),
}).strict();

export type KochschrittAktionType = z.infer<typeof KochschrittAktionSchema>;

