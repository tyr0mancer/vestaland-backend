import {Request, Response} from "express";
import {RezeptModel} from "../models/rezept.model";
import {catchError} from "./generic-controller";

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
    const rezepte = await RezeptModel.find(query);
    res.status(200).json(rezepte);
  } catch (error) {
    catchError(res, error)
  }
}


export async function getRezeptDetail(req: Request, res: Response) {
  try {
    const rezept = await RezeptModel
      .findById(req.params.id)
      .populate({path: 'zutaten.lebensmittel'})
      .populate({path: 'hilfsmittel'})
      .populate({path: 'arbeitsschritte.zutaten.lebensmittel'})
      .populate({path: 'arbeitsschritte.hilfsmittel'})

    res.status(200).json(rezept);
  } catch (error) {
    catchError(res, error)
  }
}
