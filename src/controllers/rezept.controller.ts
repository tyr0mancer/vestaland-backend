import {Request, Response} from "express";
import {DocumentType} from '@typegoose/typegoose';
import mongoose from "mongoose";

import {Datei} from "../models/datei.model";
import {Rezept, RezeptModel} from "../models/rezept.model";
import {BenutzerRolle} from "../types/types";
import {sendErrorResponse, sendGenericServerError} from "../middleware/error-handler";
import {handleFileUpload} from "./datei.controller";

export async function findeRezept(req: Request, res: Response) {
  let query: { [key: string]: any } = {};

  // @todo this should come from validation
  if (req.query.name && typeof req.query.name == "string") {
    query.name = new RegExp(req.query.name, 'i');
  }

  // @todo implement more filter
  if (req.query.zutaten && typeof req.query.zutaten == "string") {
    const zutaten = req.query.zutaten.split(',');
    query.zutaten = {$in: {lebensmittel: {$in: zutaten}}};
  }

  try {
    const rezepte = await RezeptModel.find(query)
      .populate({
        path: 'author',
        select: '_id, name'
      })
      .populate({path: 'bild'})
      .populate({path: 'zutaten.lebensmittel'})
    res.status(200).json(rezepte);
  } catch (error) {
    sendGenericServerError(res, error)
  }
}


export async function getRezeptDetail(req: Request, res: Response) {
  try {
    const rezept = await RezeptModel
      .findById(req.params.id)
      .populate({
        path: 'author',
        select: '_id, name'
      })
      .populate({path: 'bild'})
      .populate({path: 'zutaten.lebensmittel'})
      .populate({path: 'hilfsmittel'})
      .populate({path: 'kochschritte.zutaten.lebensmittel'})
      .populate({path: 'kochschritte.hilfsmittel'})

    res.status(200).json(rezept);
  } catch (error) {
    sendGenericServerError(res, error)
  }
}


export async function postRezept(req: Request, res: Response) {
  try {
    const rezept = req.body as Rezept
    rezept.author = req.user?._id ? new mongoose.Types.ObjectId(req.user._id) : undefined
    RezeptModel.create(req.body)
      .then((response) => res.status(201).json(response))
      .catch((error: any) => sendGenericServerError(res, error))
  } catch (error) {
    sendGenericServerError(res, error)
  }
}

export async function bildZuRezept(req: Request, res: Response) {
  try {
    const rezept = await RezeptModel.findById(req.params.id)
    if (!rezept)
      return sendErrorResponse(res, 404, "Rezept nicht gefunden")

    const authorId: string | null = rezept?.author?._id.toString() || null
    if (!req.user?.rollen?.includes(BenutzerRolle.ADMIN) && authorId && authorId !== req.user?._id)
      return sendErrorResponse(res, 403, "Keine ausreichenden Rechte")

    const datei: DocumentType<Datei> = await handleFileUpload(req)
    rezept.bild = datei ? new mongoose.Types.ObjectId(datei._id) : undefined

    RezeptModel.findOneAndUpdate({_id: rezept._id}, rezept, {new: true})
      .then((response) => {
        if (!response)
          return sendErrorResponse(res, 404, "Eintrag nicht gefunden")
        res.status(200).json(response)
      })
      .catch((error: any) => sendGenericServerError(res, error))
  } catch (error) {
    sendGenericServerError(res, error)
  }
}



