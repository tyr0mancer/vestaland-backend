import {Request, Response} from "express";
import {handleGenericServerError} from "../middleware/error-handler";
import {Utensil, UtensilModel} from "../models/utensil.model";

export function findeUtensilController(req: Request, res: Response) {
  let query: { [key: string]: any } = {};

  if (req.query.utensilName && typeof req.query.utensilName == "string") {
    query.utensilName = new RegExp(req.query.utensilName, 'i');
  }

  UtensilModel.find(query)
    .then((response: Utensil[]) => {
      res.status(200).json(response)
    })
    .catch((error: any) => handleGenericServerError(res, error))
}
