export enum BenutzerRolle {
  BENUTZER = 'benutzer',
  REDAKTEUR = 'redakteur',
  ADMIN = 'admin'
}

export enum Betriebsart {
  TK = 'TK',
  KUEHLSCHRANK = 'KUEHLSCHRANK',
  ZIMMERTEMPERATUR = 'ZIMMERTEMPERATUR',
  HITZE_NIEDRIG = 'HITZE_NIEDRIG',
  HITZE_MITTEL = 'HITZE_MITTEL',
  OBER_UNTER = 'OBER_UNTER',
  UMLUFT = 'UMLUFT'
}


export enum Einheit {
  ST = "ST",
  DZ = "DZ",
  G = "G",
  KG = "KG",
  LB = "LB",
  ML = "ML",
  TL = "TL",
  EL = "EL",
  L = "L",
  CP = "CP"
}


export enum AktionIcon {
  DUMMY = 'DUMMY',
  MESSER = 'MESSER',
  SCHNEEBESEN = 'SCHNEEBESEN',
  NUDELHOLZ = 'NUDELHOLZ',
  PFANNE = 'PFANNE',
  TOPF = 'TOPF',
  OFEN = 'OFEN',
  UHR = 'UHR',
  KOCHEN = 'KOCHEN',
  BLENDER = 'BLENDER',
  GRILL = 'GRILL',
  WASCHEN = 'WASCHEN'
}



export interface LoginResponse {
  _id: string,
  name: string,
  email: string,
  rollen: BenutzerRolle[],
  authtoken: string,
  refreshtoken: string,
}

export interface UserInformation {
  _id: string,
  iat: number,
  exp: number,
  rollen?: BenutzerRolle[]
  isAdmin?: boolean
}

export interface ApiError {
  status: number,
  message: string,
  description?: string,
  error?: any
}

export interface RezeptSucheQuery {
  rezeptName: string,
  vegetarisch?: boolean,
  healthy?: boolean,
  myRecipes?: boolean,
  soulfood?: boolean,
  zutaten?: string[]
}
