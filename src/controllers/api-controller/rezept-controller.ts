import {Request, Response} from "express";
import mongoose from "mongoose";

import {handleGenericServerError} from "../../services/error-handler";
import {BenutzerModel, RezeptModel} from "../../services/database-service";
import {BenutzerRolle} from "../../shared-types/enum";
import {Rezept} from "../../shared-types/models/Rezept";


export class RezeptController {

  static async search(req: Request, res: Response) {
    let searchParams: { [key: string]: any } = {};

    if (typeof req.query.myRecipes == "string")
      searchParams['owner'] = req.user?._id

    if (req.query.zutaten && typeof req.query.zutaten == "string") {
      const zutaten = req.query.zutaten.split(',').filter(id => mongoose.Types.ObjectId.isValid(id));
      searchParams['zutaten.lebensmittel'] = {$in: zutaten}
    }

    // publicVisible = true || owner = user

    const regExProps=['name']
    regExProps.forEach(propName => {
      if (searchParams[propName] && !(searchParams[propName] instanceof RegExp))
        searchParams[propName] = new RegExp(searchParams[propName], 'i');
    })



    RezeptModel.find(searchParams)
      .then((response: Rezept[]) => res.status(200).json(response))
      .catch((error: any) => handleGenericServerError(res, error))
  }

  static async post(req: Request, res: Response) {
    const neuesRezept: Rezept = req.body

    const owner = await BenutzerModel.findById(req.user?._id)
    if (owner) {
      neuesRezept.owner = owner
      if ((neuesRezept.publicVisible) && !(owner.rollen.includes(BenutzerRolle.REDAKTEUR)) && !(owner.rollen.includes(BenutzerRolle.ADMIN))) {
        neuesRezept.publicVisible = false
      }
    } else {
      neuesRezept.publicVisible = false
    }

    RezeptModel.create(neuesRezept)
      .then((response: Rezept) => res.status(201).json(response))
      .catch((error: any) => handleGenericServerError(res, error))
  }

}
