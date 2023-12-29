import {prop, getModelForClass, Ref, mongoose, modelOptions} from '@typegoose/typegoose';
import {z} from "zod";

import {Zutat} from "./zutat.model";
import {Hilfsmittel} from "./hilfsmittel.model";
import {Datei} from "./datei.model";
import {Benutzer} from "./benutzer.model";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";

export class KochschrittMeta {
  @prop()
  public temperatur?: number;

  @prop()
  public hitze?: string;

}

export class Kochschritt {
  @prop({required: true})
  public name?: string = "";

  @prop()
  public beschreibung?: string;

  @prop()
  public gesamtdauer?: number;

  @prop()
  public arbeitszeit?: number;

  @prop()
  public wartezeit?: number;

  @prop({type: Zutat, _id: false})
  public zutaten: Zutat[] = [];

  @prop({ref: "Hilfsmittel", type: mongoose.Schema.Types.ObjectId})
  public hilfsmittel: Ref<Hilfsmittel>[] = [];

  @prop({type: KochschrittMeta, _id: false})
  public meta?: KochschrittMeta;

}

export class RezeptMeta {

  @prop()
  public vegetarisch?: boolean;

  @prop()
  public healthy?: boolean;

}


@modelOptions({schemaOptions: {collection: "rezepte"}})
export class Rezept extends TimeStamps {
  @prop({required: true})
  public name: string = '';

  @prop()
  public beschreibung?: string;

  @prop()
  public gesamtdauer?: number;

  @prop()
  public arbeitszeit?: number;

  @prop()
  public wartezeit?: number;

  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public author?: Ref<Benutzer>;

  @prop({ref: "Datei", type: mongoose.Schema.Types.ObjectId})
  public bild?: Ref<Datei>;

  @prop({type: Zutat, _id: false})
  public zutaten: Zutat[] = [];

  @prop({ref: "Hilfsmittel", type: mongoose.Schema.Types.ObjectId})
  public hilfsmittel: Ref<Hilfsmittel>[] = [];

  @prop({type: Kochschritt, _id: false})
  public kochschritte: Kochschritt[] = [];

  @prop({type: RezeptMeta, _id: false})
  public meta?: RezeptMeta;

  @prop()
  public portionen: number = 1;
}

export const RezeptModel = getModelForClass(Rezept);

export const rezeptSchema = z.object({
  name: z.string({required_error: "Das Rezept muss einen Namen enthalten"}),
});
