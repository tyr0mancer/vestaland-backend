import {prop} from '@typegoose/typegoose';

class Aktion {

  @prop({required: true})
  public name: string = "";

  @prop()
  public beschreibung?: string;

  @prop()
  public temperatur?: number;

  @prop()
  public hitze?: string;

  @prop()
  public dauer?: number;

}


export {Aktion}

