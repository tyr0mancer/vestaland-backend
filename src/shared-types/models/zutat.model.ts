import {mongoose, prop, Ref} from '@typegoose/typegoose';
import {Lebensmittel} from "./lebensmittel.model";
import {z} from "zod";
import {Einheit} from "../enum";


export const ZutatSchema = z.object({
  lebensmittel: z.any(),
  freitext: z.string().optional(),
  einheit: z.nativeEnum(Einheit),
  menge: z.number(),
}).strict()

type ZutatType = z.infer<typeof ZutatSchema>;


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

