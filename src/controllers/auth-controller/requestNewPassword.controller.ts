import {Request, Response} from "express";
import {sendErrorResponse, handleGenericServerError} from "../../middleware/error-handler";
import {BenutzerModel} from "../../models/benutzer.model";
import {sendRequestPasswordResetMail} from "../../services/mailer-service/request-password-reset";
import crypto from "crypto";
import {generateTokenHash} from "../../services/createHash";

export async function requestNewPasswordController(req: Request, res: Response) {

  try {
    const benutzer = await BenutzerModel.findOne({email: req.body.email})
    if (!benutzer)
      return sendErrorResponse(res, 404, "Benutzer mit dieser Email Adresse existiert nicht")

    const token = generateRandomString()
    benutzer.resetPasswordHash = await generateTokenHash(token)

    benutzer.resetPasswordExpires = new Date(new Date().getTime() + 30 * 60 * 1000)
    await sendRequestPasswordResetMail(benutzer, token)
    await benutzer.save()
    return res.status(204).send()
  } catch (error) {
    handleGenericServerError(res, error)
  }
}

function generateRandomString(length = 6) {
  const randomBytes = crypto.randomBytes(length);
  let randomString = randomBytes.toString('hex');
  randomString = randomString.substr(0, length);
  return randomString;
}

