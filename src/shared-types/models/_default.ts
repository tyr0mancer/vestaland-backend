import {Zutat} from "./Zutat";
import {Lebensmittel} from "./Lebensmittel";
import {Einheit} from "../enum";


export const LEBENSMITTEL: Lebensmittel = {
  name: '',
  defaultEinheit: Einheit.ST,
  haendlerGruppen: []
}

export const ZUTAT: Zutat = {
  lebensmittel: undefined,
  einheit: Einheit.ST,
  menge: 1,
  freitext: ''
}


//@todo seems horrible, redo
export function createRandomId(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
