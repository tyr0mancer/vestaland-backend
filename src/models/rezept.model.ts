import {prop, getModelForClass, Ref, mongoose, modelOptions} from '@typegoose/typegoose';
import {z} from "zod";

import {Zutat} from "./zutat.model";
import {Hilfsmittel} from "./hilfsmittel.model";
import {Datei} from "./datei.model";
import {Benutzer} from "./benutzer.model";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";

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
export class Rezept extends TimeStamps {
  @prop({required: true})
  public name: string = '';

  @prop()
  public beschreibung?: string;

  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public author?: Ref<Benutzer>;

  @prop({ref: "Datei", type: mongoose.Schema.Types.ObjectId})
  public bild?: Ref<Datei>;

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
