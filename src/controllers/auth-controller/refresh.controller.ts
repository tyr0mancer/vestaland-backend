import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import {BenutzerModel} from "../../db-model";
import {successfulLogin} from "./login.controller";
import {UserInformation} from "../../shared-types/auth";
import {sendErrorResponse} from "../../middleware/error-handler";
import config from "../../config";

export function refreshController(req: Request, res: Response) {
  const refreshToken = req.cookies[config.refreshTokenCookieName]
  if (!refreshToken)
    return sendErrorResponse(res, 403, "Kein Refresh Token")
  const user = jwt.verify(refreshToken, config.refreshTokenSecret) as UserInformation
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

