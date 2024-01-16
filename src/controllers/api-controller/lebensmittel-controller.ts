import {Request, Response} from "express";

import {handleGenericServerError, sendErrorResponse} from "../../services/error-handler";
import {Lebensmittel} from "../../shared-types/models/Lebensmittel";
import {LebensmittelSucheType} from "../../shared-types/schemas/lebensmittel-schema";
import {BenutzerModel, LebensmittelModel} from "../../services/database-service"
import {BenutzerRolle} from "../../shared-types/enum";
import {getPermissionQuery} from "../../services/permission-service";


/**
 * LebensmittelController
 */
export class LebensmittelController {

  /**
   * Sucht Lebensmittel
   * @param req
   * @param res
   */
  static searchLebensmittel(req: Request, res: Response) {
    const searchParams: LebensmittelSucheType = req.query
    if (searchParams.name && !(searchParams.name instanceof RegExp))
      searchParams.name = new RegExp(searchParams.name, 'i');

    LebensmittelModel.find(getPermissionQuery(req, searchParams))
      .then((response: Lebensmittel[]) => res.status(200).json(response))
      .catch((error: any) => handleGenericServerError(res, error))
  }


  static async postLebensmittel(req: Request, res: Response) {
    const author = await BenutzerModel.findById(req.user?._id)
    if (!author)
      return sendErrorResponse(res, 403, "User zu token nicht in Datenbank")

    const lebensmittel: Lebensmittel = req.body
    lebensmittel.owner = author

    if (!author.rollen.includes(BenutzerRolle.ADMIN) && !author.rollen.includes(BenutzerRolle.REDAKTEUR))
      lebensmittel.publicVisible = false

    LebensmittelModel.create(req.body)
      .then((response) => res.status(201).json(response))
      .catch((error: any) => handleGenericServerError(res, error))
  }

}


export function importiereLebensmittelController(req: Request, res: Response) {
  LebensmittelModel.create(req.body)
    .then((response: Lebensmittel) => res.status(201).json(response))
    .catch((error: any) => handleGenericServerError(res, error))
}

export function deleteManyLebensmittelController(req: Request, res: Response) {
  const idsToDelete = req.params.ids.split(',')
  //console.log(idsToDelete)
  LebensmittelModel.deleteMany({_id: idsToDelete})
    .then((response: any) => {
      if (!response)
        return sendErrorResponse(res, 404, "Eintrag nicht gefunden")
      res.status(204).send();
    })
    .catch((error: any) => handleGenericServerError(res, error))
}

