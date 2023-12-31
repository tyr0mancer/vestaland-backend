export enum BenutzerRolle {
  BENUTZER = 'benutzer',
  REDAKTEUR = 'redakteur',
  ADMIN = 'admin'
}

export enum KochschrittTypus {
  FREITEXT = 'FREITEXT',
  SCHNEIDEN = 'schneiden',
  AUFHEIZEN = 'aufheizen',
  BRATEN = 'braten',
  HEISS_BRATEN = 'scharf anbraten',
  PUTZEN = 'putzen',
}

export enum Einheit {
  G = 'g',
  KG = 'kg',
  STUECK = 'St.',
  ML = 'ml',
  L = 'l'
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
