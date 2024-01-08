import {getModelForClass} from "@typegoose/typegoose";
import {Benutzer} from "../shared-types/models/Benutzer";
import {z} from "zod";
import {BenutzerSchema} from "../shared-types/models/benutzer.schema";
import {Datei} from "../shared-types/models/Datei";

export const BenutzerModel = getModelForClass(Benutzer);
export type BenutzerType = z.infer<typeof BenutzerSchema>;
export const DateiModel = getModelForClass(Datei);
