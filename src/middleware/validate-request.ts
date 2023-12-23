import {Request, Response, NextFunction} from 'express';
import {z} from "zod";
import {mongoose} from "@typegoose/typegoose";
import {errorResponse} from "../controllers/generic-controller";
export const genericParams = z.object({_id: z.custom<mongoose.Types.ObjectId>()})

type validateRequestType = { body?: z.ZodSchema<any>, params?: z.ZodSchema<any>, query?: z.ZodSchema<any> }
export const validateRequest = (schemaObject: validateRequestType) => {
    const schema = z.object(schemaObject);

    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse({body: req.body, query: req.query, params: req.params});
        next();
      }
      catch (error: any) {
        errorResponse(res,400, "Ungültige Anfrage", "Fehler siehe error Object", error)
      }
    };
  }
;
