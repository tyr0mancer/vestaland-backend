import {Request, Response} from "express";
import {Benutzer, BenutzerModel} from "../../models/benutzer.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {Types} from "mongoose";
import {LoginResponse} from "../../shared-types";
import {sendErrorResponse, sendGenericServerError} from "../../middleware/error-handler";
import config from "../../config";

export function loginController(req: Request, res: Response) {
  BenutzerModel.findOne({email: req.body.username})
    .then(benutzer => {

      // Kein Benutzer mit dieser Email gefunden
      if (!benutzer || !benutzer.password)
        return sendErrorResponse(res, 403, "Email / Passwort Kombination passt nicht")

      // Entspricht das gehashte Passwort dem Eintrag der Datenbank?
      bcrypt.compare(req.body.password, benutzer.password).then(isValid => {

        // Gleiche Antwort wie oben
        if (!isValid)
          return sendErrorResponse(res, 403, "Email / Passwort Kombination passt nicht")

        return successfulLogin(benutzer, benutzer._id, res)
      })

    })
    .catch(error => sendGenericServerError(res, error))
}


export function successfulLogin(benutzer: Benutzer, _id: Types.ObjectId, res: Response) {

  try {
    // Auth-Token erstellen.
    // Dieses ist für 15 Minuten gültig und sollte im Client im Memory gespeichert werden
    const authtoken = jwt.sign({
      _id,
      name: benutzer.name,
      rollen: benutzer.rollen
    }, config.authTokenSecret, {expiresIn: "15 minutes"})

    // Refresh-Token erstellen.
    // Dieses ist 24h gültig und kann zur Erstellung eines Auth-Token verwendet werden, nicht aber für andere Zugriffe
    const refreshtoken = jwt.sign({
      _id,
    }, config.refreshTokenSecret, {expiresIn: "1 days"})

    // RefreshToken als Cookie setzen
    res.cookie(config.refreshTokenCookieName, refreshtoken,
      {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 86_400_000,
        path: "/"
      });
    const loginResponse: LoginResponse = {
      _id: _id.toString(),
      name: benutzer.name,
      email: benutzer.email,
      rollen: benutzer.rollen,
      authtoken,
      refreshtoken
    }
    return res.status(200).json(loginResponse)
  } catch (error) {
    sendGenericServerError(res, error)
  }
}
