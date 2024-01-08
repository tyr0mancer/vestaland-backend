import {z} from "zod";

export const NutrientsSchema = z.object({
  kalorien: z.number(),
  fett: z.number(),
  proteine: z.number(),
  kohlenhydrate: z.number(),
  zucker: z.number(),
  ballaststoffe: z.number(),
}).strict()

export type NutrientsType = z.infer<typeof NutrientsSchema>;
