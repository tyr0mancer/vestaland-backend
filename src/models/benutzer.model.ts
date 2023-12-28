import {prop, getModelForClass, modelOptions, mongoose} from '@typegoose/typegoose';
import {z} from "zod";
import {BenutzerRolle} from "../types/types";



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
  email: z.string({required_error: "Email erforderlich"}).email("Email ist ungültig"),
  password: z.string({required_error: "Passwort erforderlich"}),
});


export const changePasswordSchema = z.object({
  password: z.string({required_error: "Passwort erforderlich"}),
});

export const requestNewPasswordSchema = z.object({
  email: z.string({required_error: "Email erforderlich"}).email("Email ist ungültig")
});

export const loginParams = z.object({token: z.custom<mongoose.Types.ObjectId>()})

export const loginSchema = z.object({
  username: z.string({required_error: "Benutzername fehlt."}),
  password: z.string({required_error: "Passwort fehlt."})
});

export const changePasswordAndLoginSchema = z.object({
  token: z.string({required_error: "Das Token fehlt."}),
  email: z.string({required_error: "Email Adresse fehlt."}),
  password: z.string({required_error: "Passwort fehlt."})
});
