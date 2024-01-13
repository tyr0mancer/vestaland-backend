import {Request, Response, NextFunction} from "express";
import {sendErrorResponse} from "./error-handler";

/**
 * @function checkAdminRole
 *
 * Middleware um zu prüfen ob der User zu dem auth Token Admin Rechte besitzt
 *
 */
export function checkAdminRole(req: Request, res: Response, next: NextFunction) {
  if (req?.user && req.user.isAdmin) return next()
  return sendErrorResponse(res, 403, "Adminrechte benötigt")
}
