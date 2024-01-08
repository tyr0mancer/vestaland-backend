import {Request, Response} from "express";
import {DocumentType} from '@typegoose/typegoose';
import * as path from "path";
import mongoose from 'mongoose';

import {Datei, DateiModel} from "../shared-types/models/datei.model";
import {ApiErrorResponse} from "../shared-types/api";
import {handleError, sendErrorResponse} from "../middleware/error-handler";

const crypto = require('crypto');
const fs = require('fs');


export async function uploadFile(req: Request, res: Response) {
  handleFileUpload(req)
    .then((response: Datei) => res.status(201).json(response))
    .catch(error => handleError(res, error))
}


//@todo How to handle Array of images? Restrict amount? AV measurements
export function handleFileUpload(req: Request): Promise<DocumentType<Datei>> {
  return new Promise<DocumentType<Datei>>((resolve, reject) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return reject({status: 400, message: "Keine Datei mitgesendet"} as ApiErrorResponse);
    }
    const uploadedFile = Array.isArray(req.files.file) ? req.files.file[0] : req.files.file

    const fileExtension = path.extname(uploadedFile.name);
    const fileNameWithoutExtension = path.basename(uploadedFile.name, path.extname(uploadedFile.name));
    const randomFileName = generateRandomString(8) + fileExtension;
    const uploadPath = path.join(__dirname, '../../public/uploads/', randomFileName);
    uploadedFile.mv(`${uploadPath}`, err => {
      return reject(err)
    });

    const datei: Datei = {
      name: fileNameWithoutExtension,
      fileNameOriginal: uploadedFile.name,
      fileName: randomFileName,
      uploadedBy: req.user?._id ? new mongoose.Types.ObjectId(req.user._id) : undefined
    }

    return resolve(DateiModel.create(datei))
  })
}

function generateRandomString(length: number) {
  return crypto.randomBytes(length).toString('hex');
}


export async function deleteFile(req: Request, res: Response) {
  try {
    const datei = await DateiModel.findById({_id: req.params.id})
    if (!datei)
      return sendErrorResponse(res, 404, "Datei nicht in DB gefunden")
    const filename = path.join(__dirname, '../../public/uploads/' + datei.fileName)
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
