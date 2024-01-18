import {Request, Response, NextFunction} from "express";
import {BenutzerRolle} from "../../shared-types/enum";
import {sendErrorResponse} from "../../services/error-handler";

/**
 * Middleware um zu prüfen ob der User eine Rolle erfüllt
 */
export function requireRole(role: BenutzerRolle): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req?.user)
      return sendErrorResponse(res, 401, "Nicht angemeldet")

    if (req.user.isAdmin || req.user.rollen.includes(role))
      return next()

    return sendErrorResponse(res, 403, `Benutzerrolle '${role}' benötigt`)
  }
}
