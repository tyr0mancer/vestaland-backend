import {Request, Response, NextFunction} from 'express';
import {mongoose} from "@typegoose/typegoose";
import {z} from "zod";

/**
 * erwartet ein Objekt der Form
 * { id: 'mongoDBObjektId'}
 *
 * idR Einsatz bei put, patch und delete call
 */
export const genericParams = z.object({
  id: z.string().refine(value => mongoose.Types.ObjectId.isValid(value), {
    message: "ungültige ObjectId",
  })
}).strict()


/**
 * Validiert den Request
 *
 * @example
 * validateRequest({
 *   params: genericParams,
 *   body: BenutzerSchema
 * })
 *
 * @param schemaObject {
 *   body?: z.ZodSchema<any>,
 *   params?: z.ZodSchema<any>,
 *   query?: z.ZodSchema<any>,
 *   files?: z.ZodSchema<any>
 * }
 */
export function validateRequest(schemaObject: {
  body?: z.ZodSchema<any>,
  params?: z.ZodSchema<any>,
  query?: z.ZodSchema<any>,
  files?: z.ZodSchema<any>
} = {}): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = z.object(schemaObject).safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
      files: req.files
    })
    if (!result.success)
      return res.status(400).json({
        message: "Validierung war nicht erfolgreich",
        errors: result.error.errors,
      });
    next();
  }
}
