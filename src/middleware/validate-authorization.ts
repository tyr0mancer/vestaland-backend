import {NextFunction, Request, Response} from 'express';
import jwt, {TokenExpiredError} from "jsonwebtoken";
import {sendErrorResponse, handleGenericServerError} from "./error-handler";
import config from "../config";
import {BenutzerRolle} from "../shared-types/enum";
import {UserInformation} from "../shared-types/auth";


export const validateAuthorization = (requiredRole?: BenutzerRolle) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization && req.headers.authorization.startsWith("Bearer "))
      ? req.headers.authorization.substring(7)
      : req.header('auth-token');

    if (!token || token === "")
      return sendErrorResponse(res, 401, "auth-token fehlt")

    try {
      const userInformation = jwt.verify(token, config.authTokenSecret) as UserInformation;
      userInformation.isAdmin = userInformation.rollen?.includes(BenutzerRolle.ADMIN);
      req.user = userInformation;
      if (requiredRole && !userInformation.isAdmin && !userInformation.rollen?.includes(requiredRole)) {
        return sendErrorResponse(res, 403, "Unzureichende Rechte")
      }
      next()
    } catch (error) {
      if (error instanceof TokenExpiredError)
        return sendErrorResponse(res, 401, "auth-token abgelaufen")
      return handleGenericServerError(res, error)
    }
  };
}


export const readToken = (req: Request, res: Response, next: NextFunction) => {

  const token = (req.headers.authorization && req.headers.authorization.startsWith("Bearer "))
    ? req.headers.authorization.substring(7)
    : req.header('auth-token');

  if (!token || token === "")
    return next()

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
