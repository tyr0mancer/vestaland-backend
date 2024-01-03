import {Request, Response, NextFunction} from 'express';
import {z, ZodError} from "zod";
import {mongoose} from "@typegoose/typegoose";
import {handleGenericServerError} from "./error-handler";

export const genericParams = z.object({_id: z.custom<mongoose.Types.ObjectId>()})

type validateRequestType = { body?: z.ZodSchema<any>, params?: z.ZodSchema<any>, query?: z.ZodSchema<any> }
export const validateRequest = (schemaObject: validateRequestType) => {
  const schema = z.object(schemaObject);

  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({body: req.body, query: req.query, params: req.params});
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.log('ZOD error')
        return res.status(400).json({
          message: "Schema ist nicht Valide",
          errors: error.errors,
        });
      }
      handleGenericServerError(res, error)
    }
  };
}

