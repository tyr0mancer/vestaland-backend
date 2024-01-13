import {Request, Response, NextFunction} from "express";
import jwt, {TokenExpiredError} from "jsonwebtoken";
import config from "../config";
import {UserInformation} from "../shared-types/auth";
import {BenutzerRolle} from "../shared-types/enum";
import {handleGenericServerError, sendErrorResponse} from "./error-handler";


/**
 * @function authenticateToken
 *
 * Middleware um das Auth Token zu validieren
 *
 */
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = (req.headers.authorization && req.headers.authorization.startsWith("Bearer "))
    ? req.headers.authorization.substring(7)
    : req.header('auth-token');

  if (!token || token === "")
    return sendErrorResponse(res, 401, "auth-token fehlt")

  try {
    const userInformation = jwt.verify(token, config.authTokenSecret) as UserInformation;
    userInformation.isAdmin = userInformation.rollen?.includes(BenutzerRolle.ADMIN);
    req.user = userInformation;
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError)
      return sendErrorResponse(res, 401, "auth-token abgelaufen")
    return handleGenericServerError(res, error)
  }
}



// @todo cleanup
declare global {
  namespace Express {
    interface Request {
      user?: UserInformation;

    }
  }
}
