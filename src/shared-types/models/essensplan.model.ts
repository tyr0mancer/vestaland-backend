import {prop, getModelForClass, modelOptions, mongoose, Ref} from '@typegoose/typegoose';
import {z} from "zod";
import {Benutzer} from "./Benutzer";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {Rezept} from "./rezept.model";

export class EssensplanEintrag {
  @prop({ref: "Rezept", type: mongoose.Schema.Types.ObjectId})
  public rezept?: Ref<Rezept>;

  @prop()
  public zuKaufenBis?: Date;
}

@modelOptions({schemaOptions: {collection: "essensplaene"}})
export class Essensplan extends TimeStamps {
  @prop({required: true})
  public name: string = "";

  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public owner?: Ref<Benutzer>;

  @prop()
  public beschreibung?: string;

  @prop({type: EssensplanEintrag, _id: false})
  public eintraege: EssensplanEintrag[] = [];
}

export const EssensplanModel = getModelForClass(Essensplan);

export const essensplanSchema = z.object({});
