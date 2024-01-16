import {prop, modelOptions} from '@typegoose/typegoose';
import {AktionIcon} from "../enum";
import {KochschrittAktionType} from "../schemas/kochschritt-aktion-schema";

@modelOptions({schemaOptions: {collection: "aktionen"}})
export class KochschrittAktion implements KochschrittAktionType {

  @prop()
  public aktionName: string = '';

  @prop()
  public aktionIcon: AktionIcon = AktionIcon.DUMMY;
}



