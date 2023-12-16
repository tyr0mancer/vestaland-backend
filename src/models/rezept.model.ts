import {prop, getModelForClass, Ref, mongoose, modelOptions} from '@typegoose/typegoose';

import {Zutat} from "./Zutat";
import {Arbeitsschritt} from "./Arbeitsschritt";
import {Hilfsmittel} from "./hilfsmittel.model";
import {z} from "zod";


@modelOptions({schemaOptions: {collection: "rezepte"}})
export class Rezept {
  @prop({required: true})
  public name: string = '';

  @prop()
  public beschreibung?: string;

  @prop({type: Zutat, _id: false})
  public zutaten: Zutat[] = [];

  @prop({ref: "Hilfsmittel", type: mongoose.Schema.Types.ObjectId})
  public hilfsmittel: Ref<Hilfsmittel>[] = [];

  @prop({type: Arbeitsschritt, _id: false})
  public arbeitsschritte: Arbeitsschritt[] = [];

  @prop()
  public portionen: number = 1;
}

export const RezeptModel = getModelForClass(Rezept);

export const rezeptSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
  })
});
