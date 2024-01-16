import {modelOptions, prop} from '@typegoose/typegoose';
import {CustomOwnership} from "./_CustomOwnership";
import {DateiType} from "../schemas/datei-schema";


@modelOptions({schemaOptions: {collection: "dateien"}})
export class Datei extends CustomOwnership implements DateiType {
  @prop({required: true})
  public originalname: string = ''

  @prop({required: true})
  public mimetype: string = ''

  @prop({required: true})
  public destination: string = ''

  @prop({required: true})
  public filename: string = ''

  @prop({required: true})
  public path: string = ''

  @prop({required: true})
  public size: number = 0

  @prop()
  public beschreibung?: string;
}
