import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import {BenutzerModel} from "../../models/benutzer.model";
import {successfulLogin} from "./login.controller";
import {UserInformation} from "../../types/types";
import {errorResponse} from "../generic-controller";

export function refreshController(req: Request, res: Response) {
  const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE || 'REFRESH_TOKEN_COOKIE']
  if (!refreshToken)
    return errorResponse(res, 403, "Kein Refresh Token")
  const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '') as UserInformation
  BenutzerModel.findById(user._id)
    .then(benutzer => {
      if (!benutzer)
        return errorResponse(res, 403, "Ungültiges Token")
      return successfulLogin(benutzer, benutzer._id, res)
    })
    .catch(error => {
      console.log(error)
      return errorResponse(res, 403, "Fehler")
    })

}

