import {z} from "zod";
import {BenutzerRolle} from "../enum";

/**
 * Definiert das Hauptvalidierungsschema für Benutzer
 */
export const BenutzerSchema = z.object({
  name: z.string({required_error: "Benutzername erforderlich"}),
  email: z.string({required_error: "Email erforderlich"}).email("Email ist ungültig"),
  password: z.string({required_error: "Passwort erforderlich"}),
  rollen: z.nativeEnum(BenutzerRolle).array(),
  mayLogin: z.boolean(),
  resetPasswordHash: z.string().optional(),
  resetPasswordExpires: z.date().optional()
}).strict()

/**
 * Typ-Definition, abgeleitet vom Hauptvalidierungsschema.
 * Wird zur Typisierung der zugehörigen Klasse verwendet.
 */
export type BenutzerType = z.infer<typeof BenutzerSchema>;

/**
 * Schema für API patch Routes
 */
export const BenutzerPatchSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  rollen: z.nativeEnum(BenutzerRolle).array().optional(),
  mayLogin: z.boolean().optional(),
}).strict()

/**
 * Schema für API post Routes
 */
export const RegisterSchema = z.object({
  name: z.string({required_error: "Benutzername erforderlich"}),
  email: z.string({required_error: "Email erforderlich"}).email("Email ist ungültig"),
  password: z.string({required_error: "Passwort erforderlich"})
}).strict()

export const RequestNewPasswordSecretTokenSchema = z.object({
  email: z.string({required_error: "Email erforderlich"}).email("Email ist ungültig")
}).strict()

// Nur die password Property aus dem RegisterSchema
const passwordField = RegisterSchema.pick({password: true, email: true});

// Benutzer will neues Passwort mit Token
export const ChangePasswordSchema = z.object({
  ...passwordField.shape,
  passwordRepeat: z.string({required_error: "Passwort wiederholung erforderlich"}),
  token: z.string().length(6)
}).refine((data) => data.password === data.passwordRepeat, {
  message: "Passwörter müssen übereinstimmen",
  path: ["passwordRepeat"],
})

// Benutzer will sein eigenes Profil ändern
export const UpdateProfileSchema = z.object({
  ...passwordField.shape,
  passwordRepeat: z.string({required_error: "Passwort wiederholung erforderlich"}),
  name: z.string().optional(),
}).refine((data) => data.password === data.passwordRepeat, {
  message: "Passwörter müssen übereinstimmen",
  path: ["passwordRepeat"],
})

// Benutzer logt sicht ein
export const LoginSchema = z.object({
  username: z.string({required_error: "Benutzername fehlt."}),
  password: z.string({required_error: "Passwort fehlt."})
});
