import {prop, modelOptions, mongoose, Ref} from '@typegoose/typegoose';
import {Benutzer} from "./Benutzer";
import {CustomOwnership} from "./_CustomOwnership";
import {LagerortType} from "../schemas/lagerort-schema";

@modelOptions({schemaOptions: {collection: "lagerorte"}})
export class Lagerort extends CustomOwnership implements LagerortType{
  @prop({required: true})
  public name: string = "";

  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public besitzer?: Ref<Benutzer>;

  @prop()
  public beschreibung?: string;
}
