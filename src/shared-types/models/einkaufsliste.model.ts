import {prop, getModelForClass, modelOptions, mongoose, Ref} from '@typegoose/typegoose';
import {Zutat} from "./Zutat";
import {Rezept} from "./rezept.model";
import {z} from "zod";
import {Benutzer} from "./Benutzer";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";

export class EinkaufslisteEintrag {
  @prop({type: Zutat, _id: false})
  public zutaten: Zutat[] = [];

  @prop({ref: "Rezept", type: mongoose.Schema.Types.ObjectId})
  public rezept?: Ref<Rezept>;

  @prop()
  public zuKaufenBis?: Date;

  @prop()
  public wichtigkeit: number = 1;
}

@modelOptions({schemaOptions: {collection: "einkaufslisten"}})
export class Einkaufsliste extends TimeStamps {
  @prop({required: true})
  public name: string = "";

  @prop()
  public beschreibung?: string;

  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public owner?: Ref<Benutzer>;

  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public sharedWith?: Ref<Benutzer>[];

  @prop({type: EinkaufslisteEintrag, _id: false})
  public eintraege: EinkaufslisteEintrag[] = [];
}

export const EinkaufslisteModel = getModelForClass(Einkaufsliste);

export const EinkaufslisteSchema = z.object({});
