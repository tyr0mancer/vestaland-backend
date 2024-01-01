import {getModelForClass, modelOptions, mongoose, prop, Ref} from '@typegoose/typegoose';
import {z} from "zod";

import {Zutat} from "./zutat.model";
import {Hilfsmittel} from "./hilfsmittel.model";
import {Datei} from "./datei.model";
import {Benutzer} from "./benutzer.model";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {KochschrittTypus} from "../shared-types";

export class KochschrittMeta {
  @prop()
  public temperatur?: number;

  @prop()
  public hitze?: string;
}

export class Kochschritt {
  @prop({required: true})
  public name?: string = "";

  @prop({required: true})
  public typus: KochschrittTypus = KochschrittTypus.FREITEXT;

  @prop()
  public beschreibung?: string;

  @prop()
  public videoUrl?: string;

  @prop()
  public repeating?: boolean;

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

  @prop()
  public soulfood?: boolean;
}


export const RezeptSchema = z.object({
  name: z.string({required_error: "Das Rezept muss einen Namen enthalten"}).describe('Der Name des Rezeptes'),
  quelleUrl: z.string().array().describe('Links zu Videos oder anderen Quellen des Rezeptes'),
  beschreibung: z.string().max(150).optional().describe('Ein kurzer Beschreibungstext'),
  freitext: z.string().optional().describe(''),
  gesamtdauer: z.number().optional(),
  arbeitszeit: z.number().optional(),
  wartezeit: z.number().optional(),
}).strict()

type RezeptType = z.infer<typeof RezeptSchema>;


@modelOptions({schemaOptions: {collection: "rezepte"}})
export class Rezept extends TimeStamps implements RezeptType {
  @prop({required: true})
  public name: string = '';

  @prop()
  public quelleUrl: string[] = [];

  @prop()
  public beschreibung?: string;

  @prop()
  public gesamtdauer?: number;

  @prop()
  public arbeitszeit?: number;

  @prop()
  public wartezeit?: number;

  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public autor?: Ref<Benutzer>;

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

