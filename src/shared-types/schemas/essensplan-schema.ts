import {z} from "zod";

/**
 * Definiert das Hauptvalidierungsschema für Essensplan
 */
export const EssensplanSchema = z.object({});


/**
 * Typ-Definition, abgeleitet vom Hauptvalidierungsschema.
 * Wird zur Typisierung der zugehörigen Klasse verwendet.
 */
export type EssensplanType = z.infer<typeof EssensplanSchema>;
