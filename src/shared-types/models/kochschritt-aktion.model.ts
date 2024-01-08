import {prop, getModelForClass, modelOptions} from '@typegoose/typegoose';
import {z} from "zod";
import {AktionIcon} from "../enum";


export const KochschrittAktionSchema = z.object({
  aktionName: z.string(),
  aktionIcon: z.nativeEnum(AktionIcon),
}).strict();

type KochschrittAktionType = z.infer<typeof KochschrittAktionSchema>;


@modelOptions({schemaOptions: {collection: "config_aktionen"}})
export class KochschrittAktion implements KochschrittAktionType {

  @prop()
  public aktionName: string = '';

  @prop()
  public aktionIcon: AktionIcon = AktionIcon.DUMMY;
}


export const KochschrittAktionModel = getModelForClass(KochschrittAktion);

