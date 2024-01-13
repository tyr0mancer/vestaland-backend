import {z} from "zod";

export const LebensmittelSchema = z.object({
  name: z.string().min(2, "Der Lebensmittel-Namen muss mindestens 2 Zeichen lang sein"),
});

export const LebensmittelSucheSchema = z.object({
  name: z.union([z.string().min(2), z.instanceof(RegExp)]).optional(),
  schwierigkeitsgrad: z.string().optional(),
}).strict()
export type LebensmittelSucheType = z.infer<typeof LebensmittelSucheSchema>;


export type LebensmittelType = z.infer<typeof LebensmittelSchema>;
