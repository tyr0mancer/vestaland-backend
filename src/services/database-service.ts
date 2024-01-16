import {getModelForClass} from "@typegoose/typegoose";
import {Benutzer} from "../shared-types/models/Benutzer";
import {Datei} from "../shared-types/models/Datei";
import {KochschrittAktion} from "../shared-types/models/KochschrittAktion";
import {Lebensmittel} from "../shared-types/models/Lebensmittel";
import {Utensil} from "../shared-types/models/Utensil";
import {Rezept} from "../shared-types/models/Rezept";
import {Einkaufsliste} from "../shared-types/models/Einkaufsliste";
import {Essensplan} from "../shared-types/models/Essensplan";
import {Lagerort} from "../shared-types/models/Lagerort";
import {Vorrat} from "../shared-types/models/Vorrat";

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
export const EinkaufslisteModel = getModelForClass(Einkaufsliste);
export const EssensplanModel = getModelForClass(Essensplan);
export const LagerortModel = getModelForClass(Lagerort);
export const VorratModel = getModelForClass(Vorrat);
