import {prop, getModelForClass, modelOptions, mongoose, Ref} from '@typegoose/typegoose';
import {z} from "zod";
import {Benutzer} from "./benutzer.model";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {Lebensmittel} from "./lebensmittel.model";
import {Einheit} from "../types/types";
import {Lagerort} from "./lagerort";


@modelOptions({schemaOptions: {collection: "vorraete"}})
export class Vorrat extends TimeStamps {
  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public besitzer?: Ref<Benutzer>;

  @prop({ref: "Lagerort", type: mongoose.Schema.Types.ObjectId})
  public lagerort?: Ref<Lagerort>;

  @prop({ref: "Lebensmittel", type: mongoose.Schema.Types.ObjectId})
  public lebensmittel?: Ref<Lebensmittel>;

  @prop()
  public einheit: Einheit = Einheit.STUECK;

  @prop()
  public menge: number = 1;

  @prop()
  public haltbarBis?: Date;
}


export const VorratModel = getModelForClass(Vorrat);

export const vorratSchema = z.object({});
