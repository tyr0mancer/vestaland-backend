import {Request} from "express";
import {BenutzerRolle} from "../../shared-types/enum";


export function mayWrite(objekt: any, req: Request): boolean {
  if (!req.user?._id)
    return false

  if (req.user.rollen?.includes(BenutzerRolle.ADMIN))
    return true

  return !!('authors' in objekt && Array.isArray(objekt.authors) && objekt.authors.includes(req.user._id));
}

export function mayRead<T extends Object = any>(objekt: T, req: Request): boolean {
  if (!('isPublic' in objekt) || objekt.isPublic === true)
    return true

  return !!(req.user?._id && 'authors' in objekt && Array.isArray(objekt.authors) && objekt.authors.includes(req.user._id))
}
