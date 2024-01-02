import {prop, getModelForClass, modelOptions, mongoose, Ref} from '@typegoose/typegoose';
import {z} from "zod";
import {Benutzer} from "./benutzer.model";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({schemaOptions: {collection: "lagerorte"}})
export class Lagerort extends TimeStamps {
  @prop({required: true})
  public name: string = "";

  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public besitzer?: Ref<Benutzer>;

  @prop()
  public beschreibung?: string;
}

export const LagerortModel = getModelForClass(Lagerort);

export const lagerortSchema = z.object({});
