import {mongoose, prop, Ref} from '@typegoose/typegoose';
import {Lebensmittel} from "./lebensmittel.model";
import {Einheit} from "../types/types";

export class Zutat {
  @prop({autopopulate: true, ref: "Lebensmittel", type: mongoose.Schema.Types.ObjectId})
  public lebensmittel?: Ref<Lebensmittel>;

  @prop()
  public freitext?: string;

  @prop()
  public einheit: Einheit = Einheit.STUECK;

  @prop()
  public menge: number = 1;
}

