import {getModelForClass} from "@typegoose/typegoose";
import {Benutzer} from "../shared-types/model/Benutzer";
import {Datei} from "../shared-types/model/Datei";
import {KochschrittAktion} from "../shared-types/model/KochschrittAktion";
import {Lebensmittel} from "../shared-types/model/Lebensmittel";
import {Utensil} from "../shared-types/model/Utensil";
import {Rezept} from "../shared-types/model/Rezept";

/**
 * collection: "benutzer"
 * @see Benutzer ({@link Benutzer})
 */
export const BenutzerModel = getModelForClass(Benutzer);

/**
 * collection: "dateien"
 * @see Datei {@link Datei}
 */
export const DateiModel = getModelForClass(Datei);
export const KochschrittAktionModel = getModelForClass(KochschrittAktion);
export const LebensmittelModel = getModelForClass(Lebensmittel);
export const UtensilModel = getModelForClass(Utensil);
export const RezeptModel = getModelForClass(Rezept);
