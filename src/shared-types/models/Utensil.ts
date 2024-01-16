import {prop, modelOptions} from '@typegoose/typegoose';
import {UtensilType} from "../schemas/utensil-schema";
import {CustomOwnership} from "./_CustomOwnership";

@modelOptions({schemaOptions: {collection: "utensilien"}})
export class Utensil extends CustomOwnership implements UtensilType {
  @prop({required: true})
  public utensilName: string = "";
  @prop()
  public beschreibung?: string;
  @prop()
  public volumen?: number;
}
