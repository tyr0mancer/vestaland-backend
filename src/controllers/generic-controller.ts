import {Request, Response} from "express";
import {ReturnModelType} from "@typegoose/typegoose/lib/types";

export function genericPost<T>(genericModel: ReturnModelType<any>) {
  return (req: Request, res: Response) => {
    genericModel.create(req.body)
      .then((response: T) => res.status(201).json(response).send())
      .catch((error: any) => {
        res.status(500).json(error).send()
        console.error(error)
      })
  }
}

export function genericPut<T>(genericModel: ReturnModelType<any>) {
  return (req: Request, res: Response) => {
    genericModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
      .then((response: T) => {
        if (!response)
          return res.status(404).send();
        res.status(200).json(response).send()
      })
      .catch((error: any) => {
        res.status(500).json(error).send()
        console.error(error)
      })
  }
}

export function genericDelete(genericModel: ReturnModelType<any>) {
  return (req: Request, res: Response) => {
    genericModel.findOneAndDelete({_id: req.params.id})
      .then((response: any) => {
        if (!response)
          return res.status(404).send();
        res.status(204).send();
      })
      .catch((error: any) => {
        res.status(500).json(error).send()
        console.error(error)
      })
  }
}

export function genericGet<T>(genericModel: ReturnModelType<any>) {
  return (req: Request, res: Response) => {
    genericModel.findById(req.params.id)
      .then((response: T) => {
        if (!response)
          return res.status(404).send();
        res.status(200).json(response).send()
      })
      .catch((error: any) => {
        res.status(500).json(error).send()
        console.error(error)
      })
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
      res.status(200).json(response).send();
    } catch (error) {
      res.status(500).json(error).send();
    }
  }
}
