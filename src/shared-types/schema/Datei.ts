import {prop, Ref, mongoose, modelOptions} from '@typegoose/typegoose';
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";

import {Benutzer} from "./Benutzer";


@modelOptions({schemaOptions: {collection: "dateien"}})
export class Datei extends TimeStamps {

  @prop({required: true})
  public dateiNameServer: string = '';

  @prop({required: true})
  public dateiNameOriginal: string = '';

  @prop()
  public beschreibung?: string;

  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public uploadedBy?: Ref<Benutzer>;
}

