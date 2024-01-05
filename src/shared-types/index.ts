export enum BenutzerRolle {
  BENUTZER = 'benutzer',
  REDAKTEUR = 'redakteur',
  ADMIN = 'admin'
}

export enum Temperatur {
  TK = 'Gefrierschrank',
  FRIDGE = 'im Kühlschrank',
  ZIMMER = 'Zimmertemperatur',
  HITZE_NIEDRIG = 'Niedrige Hitze',
  HITZE_MITTEL = 'Mittlerer Hitze'
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
