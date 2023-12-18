import {NextFunction, Request, Response} from 'express';
import {BenutzerRolle, UserInformation} from "../models/benutzer.model";
import jwt from "jsonwebtoken";

export const validateAuthorization = (requiredRole?: BenutzerRolle) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = (req.headers.authorization && req.headers.authorization.startsWith("Bearer "))
        ? req.headers.authorization.substring(7)
        : req.header('auth-token');

      if (!token)
        return res.status(401).send("Access denied");
      console.log("token is", token)

      const userInformation = jwt.verify(token, process.env.AUTH_TOKEN_SECRET || '') as UserInformation;
      userInformation.isAdmin = userInformation.rollen?.includes(BenutzerRolle.ADMIN);
      req.user = userInformation;


      if (requiredRole && !userInformation.isAdmin && !userInformation.rollen?.includes(requiredRole)) {
        return res.status(500).send("Rolle nicht erfüllt")
      }
      next()
    };
  }
;

declare global {
  namespace Express {
    interface Request {
      user?: UserInformation;
    }
  }
}
