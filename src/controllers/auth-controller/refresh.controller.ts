import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import {BenutzerModel} from "../../models/benutzer.model";
import {successfulLogin} from "./login.controller";
import {UserInformation} from "../../types/types";
import {sendErrorResponse} from "../../middleware/error-handler";

export function refreshController(req: Request, res: Response) {
  const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE || 'REFRESH_TOKEN_COOKIE']
  if (!refreshToken)
    return sendErrorResponse(res, 403, "Kein Refresh Token")
  const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '') as UserInformation
  BenutzerModel.findById(user._id)
    .then(benutzer => {
      if (!benutzer)
        return sendErrorResponse(res, 403, "Ungültiges Token")
      return successfulLogin(benutzer, benutzer._id, res)
    })
    .catch(error => {
      console.log(error)
      return sendErrorResponse(res, 403, "Fehler")
    })

}

