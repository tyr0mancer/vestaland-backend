import {prop, modelOptions} from '@typegoose/typegoose';
import {AktionIcon} from "../enum";
import {KochschrittAktionType} from "../schemas/kochschritt-aktion-schema";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({schemaOptions: {collection: "aktionen"}})
export class KochschrittAktion extends TimeStamps implements KochschrittAktionType {

  @prop()
  public aktionName: string = '';

  @prop()
  public aktionIcon: AktionIcon = AktionIcon.DUMMY;
}



