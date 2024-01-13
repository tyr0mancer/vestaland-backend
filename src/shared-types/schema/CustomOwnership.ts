import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {mongoose, prop, Ref} from "@typegoose/typegoose";
import {Benutzer} from "./Benutzer";

export class CustomOwnership extends TimeStamps {

  @prop({ref: "Benutzer", type: mongoose.Schema.Types.ObjectId})
  public owner?: Ref<Benutzer>;

  @prop()
  public publicVisible?: boolean = false;

}
