import {prop, getModelForClass, modelOptions, mongoose, Ref} from '@typegoose/typegoose';
import {Zutat} from "./zutat.model";
import {Rezept} from "./rezept.model";
import {z} from "zod";

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
export class Einkaufsliste {
  @prop({required: true})
  public name: string = "";

  @prop()
  public beschreibung?: string;

  @prop({type: EinkaufslisteEintrag, _id: false})
  public eintraege: EinkaufslisteEintrag[] = [];
}

export const EinkaufslisteModel = getModelForClass(Einkaufsliste);

export const einkaufslisteSchema = z.object({});
