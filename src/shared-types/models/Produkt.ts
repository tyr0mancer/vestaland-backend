import {modelOptions, mongoose, prop, Ref} from '@typegoose/typegoose';
import {ProduktType} from "../schemas/produkt-schema";
import {Einheit, HaendlerGruppe} from "../enum";
import {Haendler} from "./Haendler";
import {Lebensmittel} from "./Lebensmittel";

@modelOptions({schemaOptions: {collection: "produkte"}})
export class Produkt implements ProduktType {
  @prop()
  public freitext?: string;

  @prop({ref: "Lebensmittel", type: mongoose.Schema.Types.ObjectId})
  public lebensmittel?: Ref<Lebensmittel>;

  @prop()
  public menge: number = 1;

  @prop()
  public einheit: Einheit = Einheit.ST

  @prop()
  public barcode?: string;

  @prop({type: String, enum: HaendlerGruppe})
  public ladenTyp: HaendlerGruppe[] = [];

  @prop({ref: "Laden", type: mongoose.Schema.Types.ObjectId})
  public ladenListe: Ref<Haendler>[] = [];

}
