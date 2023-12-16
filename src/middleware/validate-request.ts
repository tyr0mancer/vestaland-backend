import {Request, Response, NextFunction} from 'express';
import {z} from "zod";

type validateRequestType = { body?: z.ZodSchema<any>, params?: z.ZodSchema<any>, query?: z.ZodSchema<any> }
//export const validateRequest = (schema: z.ZodSchema<any>) => {
export const validateRequest = (schemaObject: validateRequestType) => {
    const schema = z.object(schemaObject);

    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse({body: req.body, query: req.query, params: req.params});
        next();
      } catch (error: any) {
        return res.status(400).json({error: error.errors});
      }
    };
  }
;
