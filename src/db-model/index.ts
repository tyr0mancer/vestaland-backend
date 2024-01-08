import {getModelForClass} from "@typegoose/typegoose";
import {Benutzer} from "../shared-types/models/Benutzer";
import {Datei} from "../shared-types/models/Datei";
import {KochschrittAktion} from "../shared-types/models/KochschrittAktion";
import {Lebensmittel} from "../shared-types/models/Lebensmittel";
import {Utensil} from "../shared-types/models/Utensil";
import {Rezept} from "../shared-types/models/Rezept";

export const BenutzerModel = getModelForClass(Benutzer);
export const DateiModel = getModelForClass(Datei);
export const KochschrittAktionModel = getModelForClass(KochschrittAktion);
export const LebensmittelModel = getModelForClass(Lebensmittel);
export const UtensilModel = getModelForClass(Utensil);
export const RezeptModel = getModelForClass(Rezept);
