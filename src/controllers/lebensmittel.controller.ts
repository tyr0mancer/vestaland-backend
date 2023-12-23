import {Request, Response} from "express";
import {Lebensmittel, LebensmittelModel} from "../models/lebensmittel.model";
import {catchError} from "./generic-controller";

export function findeLebensmittelController(req: Request, res: Response) {
  let query: { [key: string]: any } = {};

  if (req.query.name && typeof req.query.name == "string") {
    query.name = new RegExp(req.query.name, 'i');
  }

  LebensmittelModel.find(query)
    .then((response: Lebensmittel[]) => {
      res.status(200).json(response)
    })
    .catch((error: any) => catchError(res, error))
}

export function importiereLebensmittelController(req: Request, res: Response) {
  LebensmittelModel.create(req.body)
    .then((response: Lebensmittel) => res.status(201).json(response))
    .catch((error: any) => catchError(res, error))

}
