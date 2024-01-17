import {prop, modelOptions} from '@typegoose/typegoose';
import {Nutrients} from "./Nutrients";
import {Einheit, HaendlerGruppe, LebensmittelKategorie} from "../enum";
import {LebensmittelType} from "../schemas/lebensmittel-schema";
import {CustomOwnership} from "./_CustomOwnership";

@modelOptions({schemaOptions: {collection: "lebensmittel"}})
export class Lebensmittel extends CustomOwnership implements LebensmittelType {
  @prop()
  public kategorie?: LebensmittelKategorie

  @prop({required: true})
  public name: string = ""

  @prop()
  public nameDetail?: string

  @prop()
  public nameSingular?: string

  @prop()
  public beschreibung?: string

  @prop()
  public defaultAbteilung?: string

  @prop()
  public defaultEinheit: Einheit = Einheit.ST

  @prop()
  public defaultMenge?: number

  @prop({type: String, enum: HaendlerGruppe})
  public haendlerGruppen: HaendlerGruppe[] = [];

  // Gramm pro Kubikzentimeter bzw kg pro Liter
  // Beispiel: Mehl hat eine Dichte von 0.7 - das heißt das ein kg Mehl etwa 1,5 L Volumen haben, oder 1 L Mehl, etwa 0,7 kg wiegt.
  @prop()
  public density?: number

  @prop()
  public unitWeight?: number

  @prop({type: Nutrients, _id: false})
  public nutrients?: Nutrients;

}


