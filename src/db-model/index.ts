import {getModelForClass} from "@typegoose/typegoose";
import {Benutzer} from "../shared-types/schema/Benutzer";
import {Datei} from "../shared-types/schema/Datei";
import {KochschrittAktion} from "../shared-types/schema/KochschrittAktion";
import {Lebensmittel} from "../shared-types/schema/Lebensmittel";
import {Utensil} from "../shared-types/schema/Utensil";
import {Rezept} from "../shared-types/schema/Rezept";

export const BenutzerModel = getModelForClass(Benutzer);
export const DateiModel = getModelForClass(Datei);
export const KochschrittAktionModel = getModelForClass(KochschrittAktion);
export const LebensmittelModel = getModelForClass(Lebensmittel);
export const UtensilModel = getModelForClass(Utensil);



export const RezeptModel = getModelForClass(Rezept);
