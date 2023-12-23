import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import {BenutzerModel} from "../../models/benutzer.model";
import {catchError, errorResponse} from "../generic-controller";

export async function registerController(req: Request, res: Response) {
  const {name, email, password} = req.body

  try {
    const emailExistiertSchon = await BenutzerModel.findOne({email})
    if (emailExistiertSchon)
      return errorResponse(res, 409, "Ein Benutzer mit dieser Email existiert bereits")

    // Hash passwort
    const hashedPassword = await generateHash(password)

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
    catchError(res, error)
  }
}

export async function generateHash(password: string) {
  // Hash passwort
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}
