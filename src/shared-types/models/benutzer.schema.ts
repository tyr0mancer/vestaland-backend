import {z} from "zod";
import {mongoose} from "@typegoose/typegoose";

export const BenutzerSchema = z.object({
  name: z.string({required_error: "Benutzername erforderlich"}),
  email: z.string({required_error: "Email erforderlich"}).email("Email ist ungültig"),
  password: z.string({required_error: "Passwort erforderlich"}),
  rollen: z.string().array().optional(),
  resetPasswordHash: z.string().optional(),
  resetPasswordExpires: z.date().optional()
}).strict()


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
