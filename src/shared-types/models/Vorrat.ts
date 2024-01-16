import {prop, modelOptions, mongoose, Ref} from '@typegoose/typegoose';
import {Benutzer} from "./Benutzer";
import {Lebensmittel} from "./Lebensmittel";
import {Lagerort} from "./Lagerort";
import {Einheit} from "../enum";
import {CustomOwnership} from "./_CustomOwnership";
import {VorratType} from "../schemas/vorrat-schema";


@modelOptions({schemaOptions: {collection: "vorraete"}})
export class Vorrat extends CustomOwnership implements VorratType {
  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public besitzer?: Ref<Benutzer>;

  @prop({ref: "Lagerort", type: mongoose.Schema.Types.ObjectId})
  public lagerort?: Ref<Lagerort>;

  @prop({ref: "Lebensmittel", type: mongoose.Schema.Types.ObjectId})
  public lebensmittel?: Ref<Lebensmittel>;

  @prop()
  public einheit: Einheit = Einheit.ST;

  @prop()
  public menge: number = 1;

  @prop()
  public haltbarBis?: Date;
}


