import {z} from "zod";

export const LebensmittelSchema = z.object({
  name: z.string().min(2, "Der Lebensmittel-Namen muss mindestens 2 Zeichen lang sein"),
});

export type LebensmittelType = z.infer<typeof LebensmittelSchema>;
