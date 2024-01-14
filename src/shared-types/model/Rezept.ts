import {modelOptions, mongoose, pre, prop, Ref} from '@typegoose/typegoose';

import {Zutat} from "./Zutat";
import {Utensil} from "./Utensil";
import {Datei} from "./Datei";
import {Benutzer} from "./Benutzer";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {Kochschritt} from "./Kochschritt";
import {Nutrients} from "./Nutrients";
import {RezeptType} from "./rezept.schema";
import {Tags} from "../enum/Tags";


@pre<Rezept>('findOne', function () {
  this.populate([
    {path: 'autor', select: '_id name'},
    {path: 'bild'},
    {path: 'zutaten.lebensmittel'},
    {path: 'utensilien'},
    {path: 'kochschritte.zutaten.lebensmittel'},
    {path: 'kochschritte.utensilien'},
    {path: 'kochschritte.aktionen'}
  ])
})
@pre<Rezept>('find', function () {
  this.populate([
    {path: 'autor', select: '_id name'},
    {path: 'bild'}
  ])
})
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
  public realeGesamtdauer?: number;

  @prop()
  public realeArbeitszeit?: number;

  @prop()
  public berechneteGesamtdauer?: number;

  @prop()
  public berechneteArbeitszeit?: number;

  @prop()
  public extraPortionArbeitszeit?: number;
  @prop()
  public extraPortionGesamtdauer?: number;

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

  @prop({type: String, enum: Tags})
  public tags: Tags[] = [];

  @prop()
  public schwierigkeitsgrad?: number;

  @prop()
  public portionen: number = 1;

  @prop({type: Nutrients, _id: false})
  public nutrients?: Nutrients;
}

