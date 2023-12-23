import {Request, Response} from "express";
import {ReturnModelType} from "@typegoose/typegoose/lib/types";
import {ApiError} from "../types";

export function genericPost<T>(genericModel: ReturnModelType<any>) {
  return (req: Request, res: Response) => {
    genericModel.create(req.body)
      .then((response: T) => res.status(201).json(response))
      .catch((error: any) => catchError(res, error))
  }
}

export function genericPut<T>(genericModel: ReturnModelType<any>) {
  return (req: Request, res: Response) => {
    genericModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
      .then((response: T) => {
        if (!response)
          return errorResponse(res, 404, "Eintrag nicht gefunden")
        res.status(200).json(response)
      })
      .catch((error: any) => catchError(res, error))
  }
}

export function genericDelete(genericModel: ReturnModelType<any>) {
  return (req: Request, res: Response) => {
    genericModel.findOneAndDelete({_id: req.params.id})
      .then((response: any) => {
        if (!response)
          return errorResponse(res, 404, "Eintrag nicht gefunden")
        res.status(204).send();
      })
      .catch((error: any) => catchError(res, error))
  }
}

export function genericGet<T>(genericModel: ReturnModelType<any>) {
  return (req: Request, res: Response) => {
    genericModel.findById(req.params.id)
      .then((response: T) => {
        if (!response)
          return errorResponse(res, 404, "Eintrag nicht gefunden")
        res.status(200).json(response)
      })
      .catch((error: any) => catchError(res, error))
  }
}

export function genericSearch<T>(genericModel: ReturnModelType<any>) {
  return async (req: Request, res: Response) => {
    let query: { [key: string]: any } = {};
    if (req.query.name && typeof req.query.name == "string") {
      query.name = new RegExp(req.query.name, 'i');
    }
    try {
      const response = await genericModel.find(query);
      res.status(200).json(response);
    } catch (error) {
      catchError(res, error)
    }
  }
}

export function errorResponse(res: Response, status: number = 500, message: string = 'Error', description?: string, error?: any) {
  const errorMessage: ApiError = {status, message, description, error}
  return res.status(status).json(errorMessage)
}

export function catchError(res: Response, error: any) {
  const errorMessage: ApiError = {status: 500, message: "Fehler", description: "Details siehe error-logs"}
  console.error(error)
  return res.status(500).json(errorMessage)
}
