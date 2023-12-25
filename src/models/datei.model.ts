import {prop, getModelForClass, Ref, mongoose, modelOptions} from '@typegoose/typegoose';
import {Benutzer} from "./benutzer.model";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";


@modelOptions({schemaOptions: {collection: "dateien"}})
export class Datei extends TimeStamps {

  @prop({required: true})
  public fileName: string = '';

  @prop({required: true})
  public fileNameOriginal: string = '';

  @prop({required: true})
  public name: string = '';

  @prop()
  public beschreibung?: string;

  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public uploadedBy?: Ref<Benutzer>;
}

export const DateiModel = getModelForClass(Datei);
