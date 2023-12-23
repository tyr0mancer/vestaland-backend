import {Request, Response} from "express";
import {z} from "zod";
import {Benutzer, BenutzerModel} from "../../models/benutzer.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {Types} from "mongoose";

export const loginSchema = z.object({
  username: z.string({required_error: "Benutzername fehlt."}),
  password: z.string({required_error: "Passwort fehlt."})
});

export function loginController(req: Request, res: Response) {
  BenutzerModel.findOne({email: req.body.username})
    .then(benutzer => {

      // Kein Benutzer mit dieser Email gefunden
      if (!benutzer || !benutzer.password)
        return res.status(403).send('Email / Passwort Kombination passt nicht')

      // Entspricht das gehashte Passwort dem Eintrag der Datenbank?
      bcrypt.compare(req.body.password, benutzer.password).then(isValid => {

        // Gleiche Antwort wie oben
        if (!isValid)
          return res.status(403).send('Email / Passwort Kombination passt nicht')

        return successfulLogin(benutzer, benutzer._id, res)
      })

    })
    .catch((error: any) => {
      res.status(500).json(error)
      console.error(error)
    })
}


export function successfulLogin(benutzer: Benutzer, _id: Types.ObjectId, res: Response) {

  try {
    // Auth-Token erstellen.
    // Dieses ist für 15 Minuten gültig und sollte im Client im Memory gespeichert werden
    const authtoken = jwt.sign({
      _id,
      name: benutzer.name,
      rollen: benutzer.rollen
    }, process.env.AUTH_TOKEN_SECRET as (string), {expiresIn: "15 minutes"})

    // Refresh-Token erstellen.
    // Dieses ist 24h gültig und kann zur Erstellung eines Auth-Token verwendet werden, nicht aber für andere Zugriffe
    const refreshtoken = jwt.sign({
      _id,
    }, process.env.REFRESH_TOKEN_SECRET as (string), {expiresIn: "1 days"})

    // RefreshToken als Cookie setzen
    res.cookie(process.env.REFRESH_TOKEN_COOKIE || 'REFRESH_TOKEN_COOKIE', refreshtoken,
      {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 86_400_000,
        path: "/"
      });
    return res.status(200).json({
      _id,
      name: benutzer.name,
      email: benutzer.email,
      rollen: benutzer.rollen,
      authtoken,
      refreshtoken
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send('error')
  }
}
