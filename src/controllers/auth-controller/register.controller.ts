import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import {BenutzerModel} from "../../models/benutzer.model";

export async function registerController(req: Request, res: Response) {
  const {name, email, password} = req.body

  try {
    const emailExistiertSchon = await BenutzerModel.findOne({email})
    if (emailExistiertSchon)
      return res.status(400).send("Email wurde bereits verwendet")

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
    res.status(500).json(error)
    console.error(error)
  }
}

export async function generateHash(password: string) {
  // Hash passwort
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}
