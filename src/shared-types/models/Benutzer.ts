import {prop, modelOptions} from '@typegoose/typegoose';
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {BenutzerRolle} from "../enum";
import {BenutzerType} from "../schemas/benutzer-schema";

@modelOptions({schemaOptions: {collection: "benutzer"}})
export class Benutzer extends TimeStamps implements BenutzerType {
  @prop()
  public mayLogin: boolean = false;

  @prop({required: true})
  public name: string = '';

  @prop({required: true})
  public email: string = '';

  @prop()
  public password: string = '';

  @prop({type: String, enum: BenutzerRolle})
  public rollen: BenutzerRolle[] = [];

  @prop()
  public resetPasswordHash?: string;

  @prop()
  public resetPasswordExpires?: Date;
}
