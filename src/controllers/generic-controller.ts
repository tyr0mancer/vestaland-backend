import {Request, Response} from "express";
import {ReturnModelType} from "@typegoose/typegoose/lib/types";
import {sendErrorResponse, handleGenericServerError} from "../services/error-handler";
import {Lebensmittel} from "../shared-types/model/Lebensmittel";
import {mayReadFilterQuery, mayWriteFilterQuery} from "../services/permission-service";

export class GenericController {
  static search<T>(Model: ReturnModelType<any>, regExProps: string[] = ['name'], manageOwnership = false) {
    return (req: Request, res: Response) => {
      const filterQuery = manageOwnership ? mayReadFilterQuery(req) : {}
      let searchParams = req.query as { [key: string]: string | RegExp }
      regExProps.forEach(propName => {
        if (searchParams[propName] && !(searchParams[propName] instanceof RegExp))
          searchParams[propName] = new RegExp(searchParams[propName], 'i');
      })
      Model.find({$and: [filterQuery, req.query]})
        .then((response: Lebensmittel[]) => res.status(200).json(response))
        .catch((error: any) => handleGenericServerError(res, error))
    }
  }

  static getById<T>(Model: ReturnModelType<any>) {
    return (req: Request, res: Response) => {
      Model.findById(req.params.id)
        .then((response: T) => {
          if (!response)
            return sendErrorResponse(res, 404, "Eintrag nicht gefunden")
          res.status(200).json(response)
        })
        .catch((error: any) => handleGenericServerError(res, error))
    }
  }

  static delete(Model: ReturnModelType<any>, manageOwnership = false) {
    return (req: Request, res: Response) => {
      const permissionFilterQuery = manageOwnership ? mayWriteFilterQuery(req) : {}
      Model.findOneAndDelete({$and: [permissionFilterQuery, {_id: req.params.id}]})
        .then((response: any) => {
          if (!response)
            return sendErrorResponse(res, 404, "Eintrag nicht gefunden oder keine ausreichenden Rechte")
          res.status(204).send();
        })
        .catch((error: any) => handleGenericServerError(res, error))
    }
  }

  static post<T>(Model: ReturnModelType<any>) {
    return (req: Request, res: Response) => {
      Model.create(req.body)
        .then((response: T) => res.status(201).json(response))
        .catch((error: any) => handleGenericServerError(res, error))
    }
  }

  static put<T>(Model: ReturnModelType<any>, manageOwnership = false) {
    return (req: Request, res: Response) => {
      const authorizeFilterQuery = manageOwnership ? mayWriteFilterQuery(req) : {}
      Model.findOneAndUpdate({$and: [authorizeFilterQuery, {_id: req.params.id}]}, req.body, {new: true})
        .then((response: T) => {
          if (!response)
            return sendErrorResponse(res, 404, "Eintrag nicht gefunden oder keine ausreichenden Rechte")
          res.status(200).json(response)
        })
        .catch((error: any) => handleGenericServerError(res, error))
    }
  }

  static patch<T>(Model: ReturnModelType<any>, handleAuthorization = false) {
    return this.put<T>(Model, handleAuthorization)
  }

}
