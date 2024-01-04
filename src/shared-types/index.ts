export enum BenutzerRolle {
  BENUTZER = 'benutzer',
  REDAKTEUR = 'redakteur',
  ADMIN = 'admin'
}

export enum KochschrittTypus {
  FREITEXT = '',
  SCHNEIDEN = 'schneiden',
  AUFHEIZEN = 'aufheizen',
  BRATEN = 'braten',
  HEISS_BRATEN = 'scharf anbraten',
  PUTZEN = 'putzen',
}

export enum Einheit {
  ST = "St",
  DZ = "dz",
  G = "g",
  KG = "kg",
  LB = "lb",
  ML = "ml",
  TL = "TL",
  EL = "EL",
  L = "l",
  CUP = "cp"
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
