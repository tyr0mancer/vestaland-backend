import {prop, modelOptions} from '@typegoose/typegoose';
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {UtensilType} from "./utensil.schema";

@modelOptions({schemaOptions: {collection: "utensilien"}})
export class Utensil extends TimeStamps implements UtensilType {
  @prop({required: true})
  public utensilName: string = "";
  @prop()
  public beschreibung?: string;
  @prop()
  public volumen?: number;
}
