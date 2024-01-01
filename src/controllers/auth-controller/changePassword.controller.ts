import {Request, Response} from "express";
import {handleGenericServerError} from "../../middleware/error-handler";
import {BenutzerModel} from "../../models/benutzer.model";
import {generatePasswordHash} from "../../services/createHash";

export async function changePassword(req: Request, res: Response) {
console.log(req.user?._id)

  try {
    const passwordHash = await generatePasswordHash(req.body.password)
    const benutzer = await BenutzerModel.findOneAndUpdate({_id: req.user?._id}, {password: passwordHash})
    console.log(benutzer)
    return res.status(201).send("Passwort wurde geändert")
  } catch (error) {
    handleGenericServerError(res, error)
  }
}
