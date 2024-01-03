import {prop, getModelForClass, modelOptions} from '@typegoose/typegoose';
import {z} from "zod";


export const KochschrittAktionSchema = z.object({
  aktionName: z.string(),
  aktionIcon: z.string().optional().describe('relative URL zu einem passenden Icon'),
}).strict();

type KochschrittAktionType = z.infer<typeof KochschrittAktionSchema>;


@modelOptions({schemaOptions: {collection: "config_aktionen"}})
export class KochschrittAktion implements KochschrittAktionType {
  @prop()
  public aktionName: string = '';

  @prop()
  public aktionIcon?: string;
}


export const KochschrittAktionModel = getModelForClass(KochschrittAktion);

