import {prop, modelOptions, mongoose, Ref} from '@typegoose/typegoose';
import {Benutzer} from "./Benutzer";
import {Rezept} from "./Rezept";
import {EssensplanType} from "../schemas/essensplan-schema";
import {CustomOwnership} from "./_CustomOwnership";

export class EssensplanEintrag {
  @prop({ref: "Rezept", type: mongoose.Schema.Types.ObjectId})
  public rezept?: Ref<Rezept>;

  @prop()
  public zuKaufenBis?: Date;
}

@modelOptions({schemaOptions: {collection: "essensplaene"}})
export class Essensplan extends CustomOwnership implements EssensplanType {
  @prop({required: true})
  public name: string = "";

  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public owner?: Ref<Benutzer>;

  @prop()
  public beschreibung?: string;

  @prop({type: EssensplanEintrag, _id: false})
  public eintraege: EssensplanEintrag[] = [];
}

