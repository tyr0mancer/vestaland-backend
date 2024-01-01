import {Request, Response} from "express";
import {sendErrorResponse, handleGenericServerError} from "../../middleware/error-handler";
import {BenutzerModel} from "../../models/benutzer.model";
import {loginController} from "./login.controller";
import {generatePasswordHash, generateTokenHash} from "../../services/createHash";

export async function changePasswordAndLoginController(req: Request, res: Response) {

  try {
    const benutzer = await BenutzerModel.findOne({email: req.body.username})
    if (!benutzer)
      return sendErrorResponse(res, 404, "Benutzer mit dieser Email Adresse existiert nicht")

    const tokenHash = await generateTokenHash(req.params.token)
    if (benutzer.resetPasswordHash === tokenHash) {
      if (!benutzer.resetPasswordExpires || benutzer.resetPasswordExpires < new Date())
        return sendErrorResponse(res, 403, 'Token abgelaufen')
      benutzer.resetPasswordHash = undefined
      benutzer.resetPasswordExpires = undefined
      benutzer.password = await generatePasswordHash(req.body.password)
      await benutzer.save()
      return loginController(req, res)
    }
    return sendErrorResponse(res, 403, 'Token ungültig')

  } catch (error) {
    handleGenericServerError(res, error)
  }
}
