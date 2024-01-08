import {getModelForClass} from "@typegoose/typegoose";
import {Benutzer} from "../shared-types/models/Benutzer";
import {Datei} from "../shared-types/models/Datei";
import {KochschrittAktion} from "../shared-types/models/KochschrittAktion";

export const BenutzerModel = getModelForClass(Benutzer);
export const DateiModel = getModelForClass(Datei);
export const KochschrittAktionModel = getModelForClass(KochschrittAktion);
