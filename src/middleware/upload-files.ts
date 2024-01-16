import multer from 'multer';
import {Request} from "express";
import config from "../services/config";

const path = require('path')

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, config.uploadedFilesPath);
  },
  filename: function (req: Request, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/gif' ||
    file.mimetype === 'image/webp') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadFile = multer({storage: storage, fileFilter: fileFilter});
