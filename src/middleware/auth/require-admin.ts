import {Request, Response, NextFunction} from "express";
import {sendErrorResponse} from "../../services/error-handler";

/**
 * @function requireAdmin
 *
 * Middleware um zu prüfen ob der User zu dem auth Token Admin Rechte besitzt
 *
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req?.user && req.user.isAdmin) return next()
  return sendErrorResponse(res, 403, "Adminrechte benötigt")
}
