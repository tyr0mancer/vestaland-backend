import {Request, Response} from "express";
import {sendGenericServerError} from "../../middleware/error-handler";
import {generateHash} from "./register.controller";
import {BenutzerModel} from "../../models/benutzer.model";

export async function changePassword(req: Request, res: Response) {
console.log(req.user?._id)

  try {
    const passwordHash = await generateHash(req.body.password)
    const benutzer = await BenutzerModel.findOneAndUpdate({_id: req.user?._id}, {password: passwordHash})
    console.log(benutzer)
    return res.status(201).send("Passwort wurde geändert")
  } catch (error) {
    sendGenericServerError(res, error)
  }
}
