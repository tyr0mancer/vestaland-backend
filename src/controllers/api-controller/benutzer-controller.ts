import {Request, Response} from "express";
import {BenutzerModel} from "../../services/database-service";
import {sendErrorResponse} from "../../services/error-handler";
import {generatePasswordHash} from "../../services/crypt-service";

export class BenutzerController {
  public static async register(req: Request, res: Response) {
    const {name, email, password} = req.body

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
      rollen: []
    })
    await benutzer.save()
    return res.status(201).json(benutzer)
  }

  public static async updateProfile(req: Request, res: Response) {
    console.log(req,res)
  }

}
