import {prop, getModelForClass, Ref, mongoose, modelOptions} from '@typegoose/typegoose';
import {z} from "zod";

import {Zutat} from "./zutat.model";
import {Hilfsmittel} from "./hilfsmittel.model";

export class Aktion {
  @prop({required: true})
  public name: string = "";

  @prop()
  public beschreibung?: string;

  @prop()
  public temperatur?: number;

  @prop()
  public hitze?: string;

  @prop()
  public dauer?: number;
}

export class Arbeitsschritt {
  @prop({type: Aktion, _id: false})
  public aktion?: Aktion;

  @prop({type: Zutat, _id: false})
  public zutaten: Zutat[] = [];

  @prop({ref: "Hilfsmittel", type: mongoose.Schema.Types.ObjectId})
  public hilfsmittel: Ref<Hilfsmittel>[]= [];

  @prop()
  public dauer?: number;
}

@modelOptions({schemaOptions: {collection: "rezepte"}})
export class Rezept {
  @prop({required: true})
  public name: string = '';

  @prop()
  public beschreibung?: string;

  @prop({type: Zutat, _id: false})
  public zutaten: Zutat[] = [];

  @prop({ref: "Hilfsmittel", type: mongoose.Schema.Types.ObjectId})
  public hilfsmittel: Ref<Hilfsmittel>[] = [];

  @prop({type: Arbeitsschritt, _id: false})
  public arbeitsschritte: Arbeitsschritt[] = [];

  @prop()
  public portionen: number = 1;
}

export const RezeptModel = getModelForClass(Rezept);

export const rezeptSchema = z.object({
  name: z.string({required_error: "Das Rezept muss einen Namen enthalten"}),
});
