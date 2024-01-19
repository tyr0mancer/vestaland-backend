import {Request, Response} from "express";
import mongoose from "mongoose";

import {handleGenericServerError} from "../../services/error-handler";
import {BenutzerModel, RezeptModel} from "../../services/database-service";
import {BenutzerRolle} from "../../shared-types/enum";
import {Rezept} from "../../shared-types/models/Rezept";


export class RezeptController {

  /**
   * @see RezeptSucheSchema
   */
  static async search(req: Request, res: Response) {
    const rezeptFilter = [{}]

    /**
     * Nach Rezept-Name suchen
     */
    if (req.query.name)
      rezeptFilter.push({
        name: new RegExp(req.query.name as string, 'i')
      })

    /**
     * Zutaten = Lebensmittel die im Rezept enthalten sein sollen
     */
    if (req.query.zutaten && typeof req.query.zutaten == "string") {
      const lebensmittelIdArray = req.query.zutaten.split(',').filter(id => mongoose.Types.ObjectId.isValid(id));
      rezeptFilter.push({
        "zutaten.lebensmittel": {$in: lebensmittelIdArray}
      })
    }

    /**
     * User nicht angemeldet, zeige nur öffentliche Rezepte an
     */
    if (!req.user?._id)
      rezeptFilter.push(
        {"publicVisible": true}
      )
    else {

      /**
       * Zeige nur Rezepte des Users an
       */
      if (req.query.nurEigene) {
        rezeptFilter.push({
          "owner": req.user?._id
        })
      } else {
        /**
         * Zeige Rezepte, die der User sehen darf: als Admin alle, sonst nur eigene und öffentliche
         */
        if (!req.user?.rollen.includes(BenutzerRolle.ADMIN))
          rezeptFilter.push({
            $or: [{"owner": req.user?._id}, {"publicVisible": true}]
          })
      }
    }


    /**
     * Zeige Rezepte an, die alle Tags enthalten
     */
    if (req.query.tags) {
      const filterTags = req.query.tags as string
      const tagArray = filterTags.split(',') || []
      rezeptFilter.push({
        tags: {$all: tagArray}
      })
    }

    RezeptModel.find({$and: rezeptFilter})
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
