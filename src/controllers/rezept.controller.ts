import {Request, Response} from "express";
import {DocumentType} from '@typegoose/typegoose';
import mongoose from "mongoose";

import {Datei} from "../models/datei.model";
import {Rezept, RezeptModel} from "../models/rezept.model";

import {sendErrorResponse, handleGenericServerError} from "../middleware/error-handler";
import {handleFileUpload} from "./datei.controller";
import {BenutzerRolle} from "../shared-types";
import {z} from "zod";

export const findeRezeptSchema = {
  params: z.object({
    name: z.string().optional(),
    zutaten: z.string().optional(),
    vegetarisch: z.boolean().optional(),
    healthy: z.boolean().optional(),
    myRecipes: z.boolean().optional(),
    soulfood: z.boolean().optional(),
  }).strict()
}

export async function findeRezeptController(req: Request, res: Response) {
  let query: { [key: string]: any } = {};

  if (typeof req.query.name == "string")
    query['name'] = new RegExp(req.query.name, 'i');

  if (req.query.zutaten && typeof req.query.zutaten == "string") {
    const zutaten = req.query.zutaten.split(',').filter(id => mongoose.Types.ObjectId.isValid(id));
    query['zutaten.lebensmittel'] = {$in: zutaten}
  }

  if (typeof req.query.vegetarisch == "string")
    query['meta.vegetarisch'] = true
  if (typeof req.query.healthy == "string")
    query['meta.healthy'] = true
  if (typeof req.query.soulfood == "string")
    query['meta.soulfood'] = true
  if (typeof req.query.myRecipes == "string")
    query['autor'] = req.user?._id


  try {
    const rezepte = await RezeptModel.find(query)
      .populate({
        path: 'autor',
        select: '_id, name'
      })
      .populate({path: 'bild'})
    res.status(200).json(rezepte);
  } catch (error) {
    handleGenericServerError(res, error)
  }
}


export async function getRezeptDetailController(req: Request, res: Response) {
  try {
    const rezept = await RezeptModel
      .findById(req.params.id)
      .populate({
        path: 'autor',
        select: '_id, name'
      })
      .populate({path: 'bild'})
      .populate({path: 'zutaten.lebensmittel'})
      .populate({path: 'utensilien'})
      .populate({path: 'kochschritte.zutaten.lebensmittel'})
      .populate({path: 'kochschritte.utensilien'})

    res.status(200).json(rezept);
  } catch (error) {
    handleGenericServerError(res, error)
  }
}


export async function postRezept(req: Request, res: Response) {
  try {
    const rezept = req.body as Rezept
    rezept.autor = req.user?._id ? new mongoose.Types.ObjectId(req.user._id) : undefined
    RezeptModel.create(req.body)
      .then((response) => res.status(201).json(response))
      .catch((error: any) => handleGenericServerError(res, error))
  } catch (error) {
    handleGenericServerError(res, error)
  }
}

export async function bildZuRezept(req: Request, res: Response) {
  try {
    const rezept = await RezeptModel.findById(req.params.id)
    if (!rezept)
      return sendErrorResponse(res, 404, "Rezept nicht gefunden")

    const autorId: string | null = rezept?.autor?._id.toString() || null
    if (!req.user?.rollen?.includes(BenutzerRolle.ADMIN) && autorId && autorId !== req.user?._id)
      return sendErrorResponse(res, 403, "Keine ausreichenden Rechte")

    const datei: DocumentType<Datei> = await handleFileUpload(req)
    rezept.bild = datei ? new mongoose.Types.ObjectId(datei._id) : undefined

    RezeptModel.findOneAndUpdate({_id: rezept._id}, rezept, {new: true})
      .then((response) => {
        if (!response)
          return sendErrorResponse(res, 404, "Eintrag nicht gefunden")
        res.status(200).json(response)
      })
      .catch((error: any) => handleGenericServerError(res, error))
  } catch (error) {
    handleGenericServerError(res, error)
  }
}



