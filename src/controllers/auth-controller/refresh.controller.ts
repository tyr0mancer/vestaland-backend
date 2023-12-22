import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import {BenutzerModel, UserInformation} from "../../models/benutzer.model";
import {successfulLogin} from "./login.controller";

export function refreshController(req: Request, res: Response) {

  const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE || '']
  const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '') as UserInformation

  BenutzerModel.findById(user._id)
    .then(benutzer => {
      if (!benutzer)
        return res.status(403).send('Benutzer nicht gefunden')

      return successfulLogin(benutzer, benutzer._id, res)
    })
    .catch(error => {
      console.log(error)
      return res.status(403).send('Ungültiges Token')
    })

}

