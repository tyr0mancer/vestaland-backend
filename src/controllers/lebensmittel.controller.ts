import {Request, Response} from "express";
import {LebensmittelModel} from "../models/lebensmittel.model";

export async function findeLebensmittelController(req: Request, res: Response) {
  try {
    const response = await LebensmittelModel.find({});
    res.status(200).json(response).send();
  } catch (error) {
    res.status(500).json(error).send();
  }
}


export async function erstelleLebensmittelController(req: Request, res: Response) {
  try {
    res.status(200).json("ok for now").send();
  } catch (error) {
    res.status(500).json(error).send();
  }
}

export async function importiereLebensmittelController(req: Request, res: Response) {
  try {

    res.status(200).json("ok for now").send();
  } catch (error) {
    res.status(500).json(error).send();
  }
}
