import {Request, Response} from "express";
import {catchError, errorResponse} from "./generic-controller";
import {UploadedFile} from "express-fileupload";
import * as path from "path";

export function uploadFile(req: Request, res: Response) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return errorResponse(res, 400, 'Keine Datei mitgesendet')
  }
  try {
    // Check if 'uploadedFile' is an array or a single file
    const fileOrFiles = req.files.uploadedFile;
    const dir = path.join(__dirname, '../../public/uploads');

    if (Array.isArray(fileOrFiles)) {
      // Handle the case where it's an array of files
      fileOrFiles.forEach(file => {
        file.mv(`${dir}/${file.name}`, err => {
          if (err) {
            return res.status(500).send(err);
          }
        });
      });
      res.send('Files uploaded!');
    } else {

      // Handle the case where it's a single file
      const file = fileOrFiles as UploadedFile;
      file.mv(`${dir}/${file.name}`, err => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send('File uploaded!');
      });
    }
  } catch (error: any) {
    catchError(res, error)
  }
}

/*
function moveFile(file: UploadedFile): Promise<any> {
  return new Promise((resolve, reject) => {
    const dir = path.join(__dirname, '../../public/uploads');
    file.mv(`${dir}/${file.name}`, err => {
      reject(err)
    });
    resolve('OK')
  })
}
*/


export function deleteFile(req: Request, res: Response) {
  try {
    res.status(204).send()
  } catch (error: any) {
    catchError(res, error)
  }
}
