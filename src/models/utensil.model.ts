import {prop, getModelForClass, modelOptions} from '@typegoose/typegoose';
import {z} from "zod";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";

const UtensilSchema = z.object({
  utensilName: z.string({required_error: "Das Utensil muss einen Namen enthalten"}),
  beschreibung: z.string().optional().describe('Optionaler Beschreibungstext'),
  volumen: z.number().optional().describe('Das Fassungsvermögen in ml'),
});
type UtensilType = z.infer<typeof UtensilSchema>;

@modelOptions({schemaOptions: {collection: "utensilien"}})
class Utensil extends TimeStamps implements UtensilType {
  @prop({required: true})
  public utensilName: string = "";
  @prop()
  public beschreibung?: string;
  @prop()
  public volumen?: number;
}


const UtensilModel = getModelForClass(Utensil);

export {Utensil, UtensilModel, UtensilSchema}
