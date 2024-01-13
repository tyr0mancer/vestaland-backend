import {modelOptions, prop} from '@typegoose/typegoose';
import {CustomPermissions} from "./CustomPermissions";

@modelOptions({schemaOptions: {collection: "dateien"}})
export class Datei extends CustomPermissions {

  @prop({required: true})
  public dateiNameServer: string = '';

  @prop({required: true})
  public dateiNameOriginal: string = '';

  @prop()
  public beschreibung?: string;
}
