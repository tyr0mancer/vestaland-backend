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
  public defaultUnit?: string

  @prop()
  public density?: number

  @prop()
  public unitWeight?: number
}


export const LebensmittelModel = getModelForClass(Lebensmittel);

export const lebensmittelSchema = z.object({
  name: z.string({required_error: "Das Lebensmittel muss einen Namen enthalten"}),
});
