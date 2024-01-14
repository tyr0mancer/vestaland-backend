import {NextFunction, Request, Response} from 'express';

import config from "../../services/config";
import {AuthTokenType} from "../../shared-types/types";
import {AuthService} from "../../services/auth-service";
import {BenutzerRolle} from "../../shared-types/enum";
import {handleError} from "../../services/error-handler";

/**
 * Sucht nach Auth Token und parst es um dem Request Objekt Benutzer-Informationen hinzuzufügen
 * (-> Type AuthorizedRequest). Setzt req.user auf null, falls kein gültiges Token gefunden wurde.
 *
 * Achtung! Sichert NICHT die API Route! Dazu zusätzlich die middleware authorizeRequest verwenden.
 *
 * @see authorizeRequest()
 *
 * @param req
 * @param res
 * @param next
 */
export const authenticateRequest = async (req: Request, res: Response, next: NextFunction) => {
  req.user = undefined

  const tokenString = (req.headers.authorization && req.headers.authorization.startsWith("Bearer "))
    ? req.headers.authorization.substring(7)
    : req.header('auth-token');

  if (!tokenString || tokenString === "")
    return next()

  const result = await AuthService.verifyToken<AuthTokenType>(tokenString, config.authToken.secret)
  if (result.error)
    return handleError(res, result.error)

  const userInformation = result.value
  userInformation.isAdmin = userInformation.rollen?.includes(BenutzerRolle.ADMIN);
  req.user = userInformation;
  next()

}


// @todo move
declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenType;
    }
  }
}

