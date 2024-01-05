import {getModelForClass, modelOptions, mongoose, prop, Ref} from '@typegoose/typegoose';
import {z} from "zod";

import {Zutat} from "./zutat.model";
import {Utensil} from "./utensil.model";
import {Datei} from "./datei.model";
import {Benutzer} from "./benutzer.model";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {Kochschritt} from "./kochschritt";
import {Nutrients} from "./lebensmittel.model";


//@todo make interface
class RezeptMeta {
  @prop()
  public vegetarisch?: boolean;

  @prop()
  public healthy?: boolean;

  @prop()
  public soulfood?: boolean;
}

export const RezeptSchema = z.object({
  name: z.string({required_error: "Das Rezept muss einen Namen enthalten"}).describe('Der Name des Rezeptes'),
  beschreibung: z.string().max(150).optional().describe('Ein kurzer(!) Beschreibungstext'),
  freitext: z.string().optional().describe('Freitext Beschreibung des Rezeptes'),
  quelleUrl: z.string().array().describe('Links zu Quellen oder andere Verweise'),
  berechneteGesamtdauer: z.number().optional(),
  berechneteArbeitszeit: z.number().optional(),
  realeGesamtzeit: z.number().optional(),
}).strict()

type RezeptType = z.infer<typeof RezeptSchema>;


@modelOptions({schemaOptions: {collection: "rezepte"}})
export class Rezept extends TimeStamps implements RezeptType {
  @prop({required: true})
  public name: string = '';

  @prop()
  public beschreibung?: string;

  @prop()
  public freitext?: string;

  @prop()
  public quelleUrl: string[] = [];

  @prop()
  public berechneteGesamtdauer?: number;

  @prop()
  public berechneteArbeitszeit?: number;

  @prop()
  public realeGesamtzeit?: number;

  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public autor?: Ref<Benutzer>;

  @prop({ref: "Datei", type: mongoose.Schema.Types.ObjectId})
  public bild?: Ref<Datei>;

  @prop({type: Zutat, _id: false})
  public zutaten: Zutat[] = [];

  @prop({ref: "Utensil", type: mongoose.Schema.Types.ObjectId})
  public utensilien: Ref<Utensil>[] = [];

  @prop({type: Kochschritt, _id: false})
  public kochschritte: Kochschritt[] = [];

  @prop({type: RezeptMeta, _id: false})
  public meta?: RezeptMeta;

  @prop()
  public portionen: number = 1;

  @prop({type: Nutrients, _id: false})
  public nutrients?: Nutrients;

}

export const RezeptModel = getModelForClass(Rezept);
