import {prop, getModelForClass, modelOptions} from '@typegoose/typegoose';
import {z} from "zod";

export enum BenutzerRolle {
  BENUTZER = 'benutzer',
  REDAKTEUR = 'redakteur',
  ADMIN = 'admin'
}

export interface UserInformation {
  _id: string,
  iat: number,
  exp: number,
  rollen?: BenutzerRolle[]
  isAdmin?: boolean
}

@modelOptions({schemaOptions: {collection: "benutzer"}})
export class Benutzer {
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


export const BenutzerModel = getModelForClass(Benutzer);

export const benutzerSchema = z.object({
  name: z.string({required_error: "Benutzername erforderlich"}),
  email: z.string({required_error: "Email erforderlich"}),
  password: z.string({required_error: "Passwort erforderlich"}),
});

