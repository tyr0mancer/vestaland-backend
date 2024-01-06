import {Request, Response, NextFunction} from 'express';
import {z, ZodError} from "zod";
import {mongoose} from "@typegoose/typegoose";
import {handleGenericServerError} from "./error-handler";

const objectIdSchema = z.string().refine(value => mongoose.Types.ObjectId.isValid(value), {
  message: "ungültige ObjectId",
});

const objectIdListSchema = z.string().refine(value => {
  return value.split(',').every(part => mongoose.Types.ObjectId.isValid(part.trim()));
}, {
  message: "ungültige ObjectId-Liste",
})

export const idListParams = z.object({ids: objectIdListSchema}).strict()

export const genericParams = z.object({id: objectIdSchema}).strict()

type validateRequestType = { body?: z.ZodSchema<any>, params?: z.ZodSchema<any>, query?: z.ZodSchema<any> }
export const validateRequest = (schemaObject: validateRequestType) => {
  const schema = z.object(schemaObject);
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({body: req.body, query: req.query, params: req.params});
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Schema ist nicht Valide",
          errors: error.errors,
        });
      }
      handleGenericServerError(res, error)
    }
  };
}
