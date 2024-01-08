import {Request, Response} from "express";
import {Lebensmittel, LebensmittelModel} from "../shared-types/models/lebensmittel.model";
import {handleGenericServerError, sendErrorResponse} from "../middleware/error-handler";

export function findeLebensmittelController(req: Request, res: Response) {
  let query: { [key: string]: any } = {};

  if (req.query.name && typeof req.query.name == "string") {
    query.name = new RegExp(req.query.name, 'i');
  }

  LebensmittelModel.find(query)
    .then((response: Lebensmittel[]) => {
      res.status(200).json(response)
    })
    .catch((error: any) => handleGenericServerError(res, error))
}


export function importiereLebensmittelController(req: Request, res: Response) {
  LebensmittelModel.create(req.body)
    .then((response: Lebensmittel) => res.status(201).json(response))
    .catch((error: any) => handleGenericServerError(res, error))
}

export function deleteManyLebensmittelController(req: Request, res: Response) {
  const idsToDelete = req.params.ids.split(',')
  console.log(idsToDelete)
  LebensmittelModel.deleteMany({_id: idsToDelete})
    .then((response: any) => {
      if (!response)
        return sendErrorResponse(res, 404, "Eintrag nicht gefunden")
      res.status(204).send();
    })
    .catch((error: any) => handleGenericServerError(res, error))
}
