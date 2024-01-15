import {NextFunction, Request, Response} from "express";
import {BenutzerModel} from "../services/database-service";
import {sendErrorResponse} from "../services/error-handler";
import {BenutzerRolle} from "../shared-types/enum";

/**
 * Setzt den Besitzer eines Dokumentes
 * @function setOwnershipToRequestBody
 *
 * @param req
 * @param res
 * @param next
 */
export async function setOwnershipToRequestBody(req: Request, res: Response, next: NextFunction) {
  // Prüft ob der Besitzer als Benutzer in der DB angelegt ist
  const owner = await BenutzerModel.findById(req.user?._id)
  if (!owner)
    return sendErrorResponse(res, 403, "User zu token nicht in Datenbank")

  // Setzt owner Property und verbietet
  req.body.owner = owner
  if (!owner.rollen.includes(BenutzerRolle.ADMIN) && !owner.rollen.includes(BenutzerRolle.REDAKTEUR))
    req.body.publicVisible = false
  next()
}

//@todo rename or move - this doesnt feels right
