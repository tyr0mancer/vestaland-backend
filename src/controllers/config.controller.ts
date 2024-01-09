import {Request, Response} from "express";
import {handleGenericServerError} from "../middleware/error-handler";
import {KochschrittAktion} from "../shared-types/schema/KochschrittAktion";
import {KochschrittAktionModel} from "../db-model";

export function findeAktionenController(req: Request, res: Response) {
  let query: { [key: string]: any } = {};

  if (req.query.aktionName && typeof req.query.aktionName == "string") {
    query.aktionName = new RegExp(req.query.aktionName, 'i');
  }

  KochschrittAktionModel.find(query)
    .then((response: KochschrittAktion[]) => {
      res.status(200).json(response)
    })
    .catch((error: any) => handleGenericServerError(res, error))
}
