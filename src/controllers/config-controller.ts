import {Request, Response} from "express";

export class ConfigController {
  public static readEntries(req: Request, res: Response) {
    console.log(req, res)
    //ConfigModel.find()
  }

  public static updateEntry(req: Request, res: Response) {
    console.log(req, res)
    //update<T>(key: string, value: T)
  }
}
