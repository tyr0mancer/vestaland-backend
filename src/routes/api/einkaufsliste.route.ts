import express, {Router} from "express";
import {genericParams, validateRequest} from "../../middleware/validate-request";

import {validateAuthorization} from "../../middleware/validate-authorization";
import {BenutzerRolle} from "../../shared-types/enum";
import {genericDelete, genericGet, genericPost, genericPut} from "../../controllers/generic-controller";
import {
  Einkaufsliste,
  EinkaufslisteModel,
  EinkaufslisteSchema
} from "../../shared-types/models/einkaufsliste.model";

export const einkaufslistenRouter: Router = express.Router();

einkaufslistenRouter.get('/',
  validateAuthorization(BenutzerRolle.BENUTZER),
  genericGet<Einkaufsliste>(EinkaufslisteModel))

einkaufslistenRouter.post('/',
  validateAuthorization(BenutzerRolle.BENUTZER),
  validateRequest({body: EinkaufslisteSchema}),
  genericPost<Einkaufsliste>(EinkaufslisteModel)) // @todo controller muss prüfen ob autor in liste schreiben darf

einkaufslistenRouter.put('/:id',
  validateAuthorization(BenutzerRolle.BENUTZER),
  validateRequest({params: genericParams, body: EinkaufslisteSchema}),
  genericPut<Einkaufsliste>(EinkaufslisteModel)) // @todo controller muss prüfen ob autor = req.user

einkaufslistenRouter.delete('/:id',
  validateAuthorization(BenutzerRolle.BENUTZER),
  validateRequest({params: genericParams}),
  genericDelete(EinkaufslisteModel)) // @todo controller muss prüfen ob autor = req.user



/*

einkaufslistenRouter.post('/:id/eintrag',
  validateAuthorization(BenutzerRolle.BENUTZER),
  validateRequest({body: EinkaufslisteEintrag}),
  genericDelete(EinkaufslisteModel)) // @todo controller muss prüfen ob autor = req.user

export const einkaufslistenEintragPostService = async (listeId: string, body: EinkaufslisteEintrag): Promise<EinkaufslisteEintrag> =>
  apiClient.post(`/einkaufsliste/${listeId}/eintrag`, body).then(res => res.data)

export const einkaufslistenEintragPutService = async (id: string, body: EinkaufslisteEintrag): Promise<EinkaufslisteEintrag> =>
  apiClient.put(`/einkaufslisten-eintrag/${id}`, body).then(res => res.data)

export const einkaufslistenEintragDeleteService = async (id: string): Promise<EinkaufslisteEintrag> =>
  apiClient.delete(`/einkaufslisten-eintrag/${id}`).then(res => res.data)
*/
