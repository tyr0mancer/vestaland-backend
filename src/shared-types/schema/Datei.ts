import {modelOptions, prop} from '@typegoose/typegoose';
import {CustomOwnership} from "./CustomOwnership";
import {DateiType} from "./datei-schema";


@modelOptions({schemaOptions: {collection: "dateien"}})
export class Datei extends CustomOwnership implements DateiType {

  @prop({required: true})
  public dateiNameServer: string = '';

  @prop({required: true})
  public dateiNameOriginal: string = '';

  @prop({required: true})
  public fileSize: number = 0;

  @prop()
  public beschreibung?: string;
}
