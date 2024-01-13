import {Request, Response} from "express";
import {DocumentType} from '@typegoose/typegoose';
import * as path from "path";

import {Datei} from "../../shared-types/schema/Datei";
import {ApiErrorResponse} from "../../shared-types/api";
import {handleError, handleGenericServerError, sendErrorResponse} from "../../middleware/error-handler";
import {BenutzerModel, DateiModel} from "../../db-model";

const crypto = require('crypto');
const fs = require('fs');


export async function uploadFile(req: Request, res: Response) {
  handleFileUpload(req)
    .then((response: Datei) => res.status(201).json(response))
    .catch(error => handleError(res, error))
}


//@todo How to handle Array of images? Restrict amount? AV measurements
export function handleFileUpload(req: Request): Promise<DocumentType<Datei>> {
  return new Promise<DocumentType<Datei>>(async (resolve, reject) => {
    if (!req.files || Object.keys(req.files).length === 0)
      return reject({status: 400, message: "Keine Datei mitgesendet"} as ApiErrorResponse);

    const uploadedFile = Array.isArray(req.files.file) ? req.files.file[0] : req.files.file
    if (!uploadedFile)
      return reject({status: 400, message: "Keine Datei mitgesendet"} as ApiErrorResponse);

    const fileExtension = path.extname(uploadedFile.name);
    const fileNameWithoutExtension = path.basename(uploadedFile.name, path.extname(uploadedFile.name));
    const randomFileName = generateRandomString(8) + fileExtension;
    const uploadPath = path.join(__dirname, '../../public/uploads/', randomFileName);
    uploadedFile.mv(`${uploadPath}`, err => {
      return reject(err)
    });

    const owner = await BenutzerModel.findById(req.user?._id)
    if (!owner) return reject('Kann Urheber nicht in DB finden')

    const datei: Datei = {
      beschreibung: fileNameWithoutExtension,
      dateiNameOriginal: uploadedFile.name,
      dateiNameServer: randomFileName,
      fileSize: uploadedFile.size,
      owner: owner,
    }

    return resolve(DateiModel.create(datei))
  })
}

function generateRandomString(length: number) {
  return crypto.randomBytes(length).toString('hex');
}


export async function deleteFile(req: Request, res: Response) {
  try {
    console.log('deleting')
    const datei = await DateiModel.findById({_id: req.params.id})

/*
    if (!mayWrite(datei, req))
      return sendErrorResponse(res, 401, "Keine Schreib-Rechte")
*/

    if (!datei)
      return sendErrorResponse(res, 404, "Datei nicht in DB gefunden")
    const filename = path.join(__dirname, '../../public/uploads/' + datei.dateiNameServer)
    fs.unlink(filename, (err: any) => {
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
    });
  } catch (error) {
    return handleError(res, error)
  }
}


export function searchDatei(req: Request, res: Response) {
  let query: { [key: string]: any } = {};

  if (!req.user?._id)
    return res.status(500).send('should not have reached this code');

  if (req.query.name && typeof req.query.name == "string") {
    query.name = new RegExp(req.query.name, 'i');
  }


  DateiModel.find(query)
    .then((response: Datei[]) => {
      res.status(200).json(response)
    })
    .catch((error: any) => handleGenericServerError(res, error))
}
