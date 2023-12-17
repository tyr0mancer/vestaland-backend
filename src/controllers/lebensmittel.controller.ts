import {Request, Response} from "express";
import {Lebensmittel, LebensmittelModel} from "../models/lebensmittel.model";

export function findeLebensmittelController(req: Request, res: Response) {



  LebensmittelModel.find({})
    .then((response: Lebensmittel[]) => {
      res.status(200).json(response)
    })
    .catch((err: any) => {
      console.error(JSON.stringify(err))
      res.status(500).send();
    })
}


export function erstelleLebensmittelController(req: Request, res: Response) {
  try {
    res.status(200).send("ok for now");
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function importiereLebensmittelController(req: Request, res: Response) {
  try {

    res.status(200).send("ok for now");
  } catch (error) {
    res.status(500).json(error);
  }
}
