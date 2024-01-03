import {prop, getModelForClass, modelOptions} from '@typegoose/typegoose';
import {z} from "zod";

@modelOptions({schemaOptions: {collection: "lebensmittel"}})
export class Lebensmittel {
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
}

export const LebensmittelModel = getModelForClass(Lebensmittel);

export const lebensmittelSchema = z.object({
  name: z.string({required_error: "Das Lebensmittel muss einen Namen enthalten"}),
});



export enum Einheit {
  ST = "St",
  DZ = "dz",
  LB = "lb",
  G = "g",
  KG = "kg",
  ML = "ml",
  L = "l",
}
