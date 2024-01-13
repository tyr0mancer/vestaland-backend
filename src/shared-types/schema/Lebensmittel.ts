import {prop, modelOptions} from '@typegoose/typegoose';
import {Nutrients} from "./Nutrients";
import {Einheit} from "../enum";
import {LebensmittelType} from "./lebensmittel.schema";
import {CustomOwnership} from "./CustomOwnership";


@modelOptions({schemaOptions: {collection: "lebensmittel"}})
export class Lebensmittel extends CustomOwnership implements LebensmittelType {
  @prop()
  public kategorie?: string

  @prop({required: true})
  public name: string = ""

  @prop()
  public nameDetail?: string

  @prop()
  public nameSingular?: string

  @prop()
  public beschreibung?: string

  @prop()
  public defaultEinheit: Einheit = Einheit.ST

  @prop()
  public defaultMenge?: number

  // Gramm pro Kubikzentimeter bzw kg pro Liter
  // Beispiel: Mehl hat eine Dichte von 0.7 - das heißt das ein kg Mehl etwa 1,5 L Volumen haben, oder 1 L Mehl, etwa 0,7 kg wiegt.
  @prop()
  public density?: number

  @prop()
  public unitWeight?: number

  @prop({type: Nutrients, _id: false})
  public nutrients?: Nutrients;

}

