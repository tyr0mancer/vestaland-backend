import {modelOptions, mongoose, prop, Ref} from '@typegoose/typegoose';

import {Zutat} from "./Zutat";
import {Utensil} from "./Utensil";
import {Datei} from "./Datei";
import {Benutzer} from "./Benutzer";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {Kochschritt} from "./Kochschritt";
import {Nutrients} from "./Nutrients";
import {RezeptMetaType, RezeptType} from "./rezept.schema";


//@todo make interface -> Tags
class RezeptMeta implements RezeptMetaType {
  @prop()
  public vegetarisch?: boolean;

  @prop()
  public healthy?: boolean;

  @prop()
  public soulfood?: boolean;

  @prop()
  public schwierigkeitsgrad?: number;
}


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
