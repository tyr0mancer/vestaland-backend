import {prop} from "@typegoose/typegoose";
import {NutrientsType} from "../schemas/nutrients-schema";

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
