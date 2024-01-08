import {mongoose, prop, Ref} from "@typegoose/typegoose";
import {KochschrittAktion} from "./kochschritt-aktion.model";
import {Zutat, ZutatSchema} from "./zutat.model";
import {Utensil} from "./utensil.model";
import {z} from "zod";
import {Betriebsart} from "../../../../vestaland-frontend/src/shared-types/enum";


export const KochschrittSchema = z.object({
  aktion: z.any().optional(),
  beschreibung: z.string().optional(),
  videoUrl: z.string().optional(),
  repeating: z.boolean().optional(),
  gesamtdauer: z.number().optional(),
  arbeitszeit: z.number().optional(),
  wartezeit: z.number().optional(),
  zutaten: z.array(ZutatSchema),
  utensilien: z.array(z.any()),
  betriebsart: z.nativeEnum(Betriebsart).optional(),
  temperatur: z.number().optional(),

}).strict()

type KochschrittType = z.infer<typeof KochschrittSchema>;


export class Kochschritt implements KochschrittType {
  @prop({ref: "KochschrittAktion", type: mongoose.Schema.Types.ObjectId})
  public aktion?: Ref<KochschrittAktion>;

  @prop()
  public beschreibung?: string;

  @prop()
  public videoUrl?: string;

  @prop()
  public repeating?: boolean;

  @prop()
  public gesamtdauer?: number;

  @prop()
  public arbeitszeit?: number;

  @prop()
  public wartezeit?: number;

  @prop({type: Zutat, _id: false})
  public zutaten: Zutat[] = [];

  @prop({ref: "Utensil", type: mongoose.Schema.Types.ObjectId})
  public utensilien: Ref<Utensil>[] = [];

  @prop()
  public betriebsart?: Betriebsart;

  @prop()
  public temperatur?: number; //  Grad Celsius

}
