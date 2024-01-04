import {mongoose, prop, Ref} from "@typegoose/typegoose";
import {KochschrittAktion} from "./kochschritt-aktion.model";
import {Zutat} from "./zutat.model";
import {Utensil} from "./utensil.model";

export class KochschrittMeta {
  @prop()
  public temperatur?: number;

  @prop()
  public hitze?: string;
}


export class Kochschritt {
  @prop()
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
  public arbeitszeit?: number;

  @prop()
  public wartezeit?: number;

  @prop({type: Zutat, _id: false})
  public zutaten: Zutat[] = [];

  @prop({ref: "Utensil", type: mongoose.Schema.Types.ObjectId})
  public utensilien: Ref<Utensil>[] = [];

  @prop({type: KochschrittMeta, _id: false})
  public meta?: KochschrittMeta;
}
