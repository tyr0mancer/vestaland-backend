import {z} from "zod";
import {RefType} from "./_ref-schema";
import {LebensmittelSchema} from "./lebensmittel-schema";

export const LebensmittelAustauschSchema = z.object({
  alternative: RefType(LebensmittelSchema),
  faktor: z.number(),
  notOptimal: z.boolean(),
})

export type LebensmittelAustauschType = z.infer<typeof LebensmittelAustauschSchema>;
