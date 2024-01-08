import {mongoose, prop, Ref} from "@typegoose/typegoose";

import {KochschrittType} from "./kochschritt.schema";
import {Betriebsart} from "../enum";
import {KochschrittAktion} from "./KochschrittAktion";
import {Zutat} from "./Zutat";
import {Utensil} from "./Utensil";


export class Kochschritt implements KochschrittType {
  @prop({ref: "KochschrittAktion", type: mongoose.Schema.Types.ObjectId})
  public aktion?: Ref<KochschrittAktion>;

  @prop()
  public beschreibung?: string;

  @prop()
  public videoUrl?: string;

  @prop()
  public repeating?: boolean;

  @prop()
  public gesamtdauer?: number;

  @prop()
  public betriebsart?: Betriebsart;

  @prop()
  public temperatur?: number; //  Grad Celsius

  @prop()
  public arbeitszeit?: number;

  @prop()
  public wartezeit?: number;

  @prop()
  public erforderlicheKochschritte?: mongoose.Schema.Types.ObjectId[];

  @prop({type: Zutat, _id: false})
  public zutaten: Zutat[] = [];

  @prop({ref: "Utensil", type: mongoose.Schema.Types.ObjectId})
  public utensilien: Ref<Utensil>[] = [];


}
