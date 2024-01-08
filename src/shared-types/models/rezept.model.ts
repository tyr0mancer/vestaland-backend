import {getModelForClass, modelOptions, mongoose, prop, Ref} from '@typegoose/typegoose';
import {z} from "zod";

import {Zutat} from "./zutat.model";
import {Utensil} from "./utensil.model";
import {Datei} from "./Datei";
import {Benutzer} from "./Benutzer";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {Kochschritt, KochschrittSchema} from "./kochschritt";
import {Nutrients, NutrientsSchema} from "./nutrients.model";


const extension = {
  _id: z.string().optional(),         // MongoDB ObjectId
  __v: z.number().optional(),         // Version key
  updatedAt: z.any().optional(),     // updatedAt timestamp
  createdAt: z.any().optional(),     // createdAt timestamp
}


//@todo make interface -> Tags
class RezeptMeta {
  @prop()
  public vegetarisch?: boolean;

  @prop()
  public healthy?: boolean;

  @prop()
  public soulfood?: boolean;

  @prop()
  public schwierigkeitsgrad?: number;
}

export const RezeptSchema = z.object({
  name: z.string({required_error: "Das Rezept muss einen Namen enthalten"}).min(1).describe('Der Name des Rezeptes'),
  beschreibung: z.string().max(150).optional().describe('Ein kurzer(!) Beschreibungstext'),
  freitext: z.string().optional().describe('Freitext Beschreibung des Rezeptes'),
  quelleUrl: z.string().optional().array().describe('Links zu Quellen oder andere Verweise'),
  berechneteGesamtdauer: z.number().optional(),
  berechneteArbeitszeit: z.number().optional(),
  extraZeitExtraPortion: z.number().optional(),
  realeGesamtzeit: z.number().optional(),
  portionen: z.number({required_error: "Die Anzahl an Portionen muss angegeben sein"}),
  nutrients: NutrientsSchema.optional(),
  kochschritte: z.array(KochschrittSchema),

  autor: z.any().optional(),
  utensilien: z.array(z.any()),
  zutaten: z.array(z.any()),
  aktion: z.any().optional(),
  bild: z.any().optional(),
  meta: z.any().optional(),

}).extend(extension).strict()


type RezeptType = z.infer<typeof RezeptSchema>;


@modelOptions({schemaOptions: {collection: "rezepte"}})
export class Rezept extends TimeStamps implements RezeptType {
  @prop({required: true})
  public name: string = '';

  @prop()
  public beschreibung?: string;

  @prop()
  public freitext?: string;


  @prop({type: String, required: true, default: []})
  public quelleUrl!: mongoose.Types.Array<string>;

  @prop()
  public berechneteGesamtdauer?: number;

  @prop()
  public berechneteArbeitszeit?: number;

  @prop()
  public extraZeitExtraPortion?: number;

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
