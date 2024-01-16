import {modelOptions, prop} from '@typegoose/typegoose';
import {HaendlerType} from "../schemas/haendler-schema";
import {HaendlerGruppe} from "../enum";

@modelOptions({schemaOptions: {collection: "haendler"}})
export class Haendler implements HaendlerType {

  @prop()
  public haendlerGruppe: HaendlerGruppe = HaendlerGruppe.TIER_B;

  @prop()
  public haendlerName: string = ''

  @prop()
  public geoData: string = ''

  @prop()
  public abteilungOrdnung: string[] = []

}

