import {getModelForClass} from "@typegoose/typegoose";
import {Benutzer} from "./Benutzer";
import {z} from "zod";
import {BenutzerSchema} from "./benutzer.schema";

export const BenutzerModel = getModelForClass(Benutzer);
export type BenutzerType = z.infer<typeof BenutzerSchema>;
