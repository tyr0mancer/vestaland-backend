export enum BenutzerRolle {
  BENUTZER = 'benutzer',
  REDAKTEUR = 'redakteur',
  ADMIN = 'admin'
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
