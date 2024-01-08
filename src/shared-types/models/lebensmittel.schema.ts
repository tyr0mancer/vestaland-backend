import {z} from "zod";

export const LebensmittelSchema = z.object({
  name: z.string({required_error: "Das Lebensmittel muss einen Namen enthalten"}),
});

export type LebensmittelType = z.infer<typeof LebensmittelSchema>;
