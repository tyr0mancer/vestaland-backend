import {z} from "zod";
import {BenutzerRolle} from "../enum";

// Wiederverwendete Properties
const passwordField = z.string({required_error: "Passwort erforderlich"})
const passwordRepeatField = z.string({required_error: "Passwort wiederholen"})
const tokenField = z.string().length(6)

/**
 * Definiert das Hauptvalidierungsschema für Benutzer
 */
export const BenutzerSchema = z.object({
  name: z.string({required_error: "Benutzername erforderlich"}),
  email: z.string({required_error: "Email erforderlich"}).email("Email ist ungültig"),
  password: passwordField,
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
export const BenutzerPatchSchema = BenutzerSchema.pick({
  name: true, email: true, rollen: true, mayLogin: true
}).partial()


/**
 * Schema für API post Routes
 */
export const RegisterSchema = BenutzerSchema.pick({
  name: true, email: true, password: true
})


export const RequestNewPasswordSecretTokenSchema = BenutzerSchema.pick({
  email: true
})


// Benutzer will neues Passwort mit Token
export const ChangePasswordSchema = z.object({
  token: tokenField,
  password: passwordField,
  passwordRepeat: passwordRepeatField
})
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwörter müssen übereinstimmen",
    path: ["passwordRepeat"],
  })

// Benutzer will sein eigenes Profil ändern
export const UpdateProfileSchema = z.object({
  password: passwordField,
  passwordRepeat: passwordRepeatField,
  name: z.string().optional(),
})
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwörter müssen übereinstimmen",
    path: ["passwordRepeat"],
  })

// Benutzer logt sicht ein
export const LoginSchema = z.object({
  username: z.string({required_error: "Benutzername fehlt."}),
  password: z.string({required_error: "Passwort fehlt."})
});
