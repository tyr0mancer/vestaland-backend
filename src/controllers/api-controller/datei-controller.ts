import {Request, Response} from "express";

import {handleError, sendErrorResponse} from "../../services/error-handler";
import {Datei} from "../../shared-types/models/Datei";
import {BenutzerModel, DateiModel} from "../../services/database-service";
import fs from "fs";

export class DateiController {
  static async post(req: Request, res: Response) {
    const tokenUser = await BenutzerModel.findById(req.user?._id)
    if (!tokenUser)
      return sendErrorResponse(res, 403, "User zu token nicht in Datenbank")

    const newFile = Array.isArray(req.files) ? req.files[0] : req.files
    if (!newFile)
      return sendErrorResponse(res, 500, "Cant read file")

    const {originalname, mimetype, destination, filename, path, size} = newFile

    const datei = {
      originalname, mimetype, destination, filename, path, size,
      beschreibung: originalname,
      owner: tokenUser
    } as Datei

    return DateiModel.create(datei)
      .then((response: Datei) => res.status(201).json(response))
  }

  static async delete(req: Request, res: Response) {
    const datei = await DateiModel.findById(req.params?.id)
    if (!datei)
      return res.status(404).send('Datei nicht in DB gefunden');
    try {
      fs.unlink(datei.path, (err: any) => {
        if (err) {
          if (err.code === 'ENOENT') {
            return res.status(404).send('Datei nicht auf Server gefunden');
          }
          return res.status(500).send('Datei konnte nicht gelöscht werden');
        }
        DateiModel.findOneAndDelete({_id: req.params.id})
          .then(() => res.status(204).send())
          .catch((error) => {
            console.error(error)
            sendErrorResponse(res, 500, "Datei wurde gelöscht konnte aber nicht aus DB entfernt werden")
          })
      })
    } catch (e: any) {
      handleError(res, e)
    }
  }
}
