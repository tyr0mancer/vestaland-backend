import {NextFunction, Request, Response} from 'express';
import jwt, {TokenExpiredError} from "jsonwebtoken";
import {BenutzerRolle, UserInformation} from "../types/types";
import {sendErrorResponse, sendGenericServerError} from "./error-handler";

export const validateAuthorization = (requiredRole?: BenutzerRolle) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization && req.headers.authorization.startsWith("Bearer "))
      ? req.headers.authorization.substring(7)
      : req.header('auth-token');

    if (!token || token === "")
      return sendErrorResponse(res, 401, "auth-token fehlt")

    try {
      const userInformation = jwt.verify(token, process.env.AUTH_TOKEN_SECRET || '') as UserInformation;
      userInformation.isAdmin = userInformation.rollen?.includes(BenutzerRolle.ADMIN);
      req.user = userInformation;
      if (requiredRole && !userInformation.isAdmin && !userInformation.rollen?.includes(requiredRole)) {
        return sendErrorResponse(res, 403, "Unzureichende Rechte")
      }
      next()
    } catch (error) {
      if (error instanceof TokenExpiredError)
        return sendErrorResponse(res, 401, "auth-token abgelaufen")
      return sendGenericServerError(res, error)
    }
  };
}


// @todo cleanup
declare global {
  namespace Express {
    interface Request {
      user?: UserInformation;

    }
  }
}
