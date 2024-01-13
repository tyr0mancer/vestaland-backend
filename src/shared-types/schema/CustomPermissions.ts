import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {mongoose, prop, Ref} from "@typegoose/typegoose";
import {Benutzer} from "./Benutzer";
import {BenutzerRolle} from "../enum";

export class CustomPermissions extends TimeStamps {

  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public authors: Ref<Benutzer>[] = [];

  @prop()
  public isPublic?: boolean = false;

  @prop()
  public mayWriteWhitelist?: BenutzerRolle[] = []

  @prop()
  public mayReadWhitelist?: BenutzerRolle[] = []

}
