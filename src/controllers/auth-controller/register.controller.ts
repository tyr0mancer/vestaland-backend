import {Request, Response} from "express";
import {BenutzerModel} from "../../db-model";
import {sendErrorResponse, handleGenericServerError} from "../../middleware/error-handler";
import {generatePasswordHash} from "../../services/createHash";

export async function registerController(req: Request, res: Response) {
  const {name, email, password} = req.body

  try {
    const emailExistiertSchon = await BenutzerModel.findOne({email})
    if (emailExistiertSchon)
      return sendErrorResponse(res, 409, "Ein Benutzer mit dieser Email existiert bereits")

    // Hash passwort
    const hashedPassword = await generatePasswordHash(password)

    // Neuer Benutzer
    const benutzer = new BenutzerModel({
      name,
      email,
      password: hashedPassword,
      rollen: ["benutzer"]
    })
    await benutzer.save()
    return res.status(201).json(benutzer)

  } catch (error) {
    handleGenericServerError(res, error)
  }
}
