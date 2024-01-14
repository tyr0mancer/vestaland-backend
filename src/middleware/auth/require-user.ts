import {Request, Response, NextFunction} from "express";
import {sendErrorResponse} from "../../services/error-handler";

/**
 * @function requireUser
 *
 * Middleware um zu prüfen ob dem req.body
 *
 */
export function requireUser(req: Request, res: Response, next: NextFunction) {
  if (req?.user) return next()
  return sendErrorResponse(res, 400, "Bitte melden Sie sich an")
}
