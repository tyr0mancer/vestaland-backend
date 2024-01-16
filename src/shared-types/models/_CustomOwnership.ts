import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {mongoose, prop, Ref} from "@typegoose/typegoose";
import {Benutzer} from "./Benutzer";
import {CustomOwnershipType} from "../schemas/_custom-ownership-schema";

/**
 * Helfer Klasse um Ownership einzelner Dokumente zu handhaben
 */
export class CustomOwnership extends TimeStamps implements CustomOwnershipType {
  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public owner?: Ref<Benutzer>;

  @prop()
  public publicVisible?: boolean = false;
}
