import {prop, modelOptions, mongoose, Ref} from '@typegoose/typegoose';
import {Zutat} from "./Zutat";
import {Rezept} from "./Rezept";
import {Benutzer} from "./Benutzer";
import {EinkaufslistenEintragType, EinkaufslisteType} from "../schemas/einkaufsliste-schema";
import {CustomOwnership} from "./_CustomOwnership";
import {Produkt} from "./Produkt";

export class EinkaufslisteEintrag implements EinkaufslistenEintragType {
  @prop({type: Zutat, _id: false})
  public zutat?: Zutat;

  @prop({type: Produkt, _id: false})
  public produkt?: Produkt;

  @prop({ref: "Rezept", type: mongoose.Schema.Types.ObjectId})
  public rezept?: Ref<Rezept>;

  @prop()
  public zuKaufenBis?: Date;

  @prop()
  public wichtigkeit: number = 1;

  @prop()
  public istAustauschOK: Boolean = true;

  @prop()
  public ladenGruppe?: string;

}

@modelOptions({schemaOptions: {collection: "einkaufslisten"}})
export class Einkaufsliste extends CustomOwnership implements EinkaufslisteType {
  @prop({required: true})
  public listenName: string = "";

  @prop()
  public beschreibung?: string;

  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public sharedWith: Ref<Benutzer>[] = [];

  @prop({type: EinkaufslisteEintrag, _id: false})
  public eintraege: EinkaufslisteEintrag[] = [];
}
