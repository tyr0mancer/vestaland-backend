import {mongoose, prop, Ref} from "@typegoose/typegoose";

import {KochschrittType} from "../schemas/kochschritt-schema";
import {Betriebsart} from "../enum";
import {KochschrittAktion} from "./KochschrittAktion";
import {Zutat} from "./Zutat";
import {Utensil} from "./Utensil";
import {createRandomId} from "./_default";


export class Kochschritt implements KochschrittType {
  @prop({ref: "KochschrittAktion", type: mongoose.Schema.Types.ObjectId})
  public aktionen: Ref<KochschrittAktion>[] = [];

  @prop()
  public beschreibung?: string;

  @prop()
  public quelleUrl?: string;

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
  public wartenErforderlich?: boolean;

  @prop({type: Zutat, _id: false})
  public zutaten: Zutat[] = [];

  @prop({ref: "Utensil", type: mongoose.Schema.Types.ObjectId})
  public utensilien: Ref<Utensil>[] = [];


  @prop()
  public _id: string = createRandomId(8);

  @prop()
  public ergebnisName?: string;

  @prop({type: String})
  public erforderlicheErgebnisse: string[] = [];

  @prop()
  public totalWeight?: number;

  @prop()
  public totalVolume?: number;


}
