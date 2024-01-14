import {Request, Response} from "express";
import mongoose from "mongoose";

import {handleGenericServerError} from "../../services/error-handler";
import {RezeptModel} from "../../services/database-service";

export class RezeptController {

  static async search(req: Request, res: Response) {
    let query: { [key: string]: any } = {};

    if (typeof req.query.name == "string")
      query['name'] = new RegExp(req.query.name, 'i');

    if (req.query.zutaten && typeof req.query.zutaten == "string") {
      const zutaten = req.query.zutaten.split(',').filter(id => mongoose.Types.ObjectId.isValid(id));
      query['zutaten.lebensmittel'] = {$in: zutaten}
    }

    if (typeof req.query.myRecipes == "string")
      query['autor'] = req.user?._id

    try {
      const rezepte = await RezeptModel.find(query)
      res.status(200).json(rezepte);
    } catch (error) {
      handleGenericServerError(res, error)
    }

  }
}
