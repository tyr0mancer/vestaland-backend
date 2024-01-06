import {prop} from "@typegoose/typegoose";
import {z} from "zod";

export const NutrientsSchema = z.object({
  fett: z.number(),
  proteine: z.number(),
  kohlenhydrate: z.number(),
  zucker: z.number(),
  ballaststoffe: z.number(),
}).strict()

type NutrientsType = z.infer<typeof NutrientsSchema>;


export class Nutrients implements NutrientsType {
  @prop()
  public kalorien: number = 0;
  @prop()
  public fett: number = 0;
  @prop()
  public proteine: number = 0;
  @prop()
  public kohlenhydrate: number = 0;
  @prop()
  public zucker: number = 0;
  @prop()
  public ballaststoffe: number = 0;
}
