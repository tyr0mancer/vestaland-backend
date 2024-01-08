import {mongoose, prop, Ref} from '@typegoose/typegoose';
import {Lebensmittel} from "./lebensmittel.model";
import {Einheit} from "../enum";
import {ZutatType} from "./zutat.schema";

export class Zutat implements ZutatType {
  @prop({autopopulate: true, ref: "Lebensmittel", type: mongoose.Schema.Types.ObjectId})
  public lebensmittel?: Ref<Lebensmittel>;

  @prop()
  public freitext?: string;

  @prop()
  public einheit: Einheit = Einheit.ST;

  @prop()
  public menge: number = 1;
}

