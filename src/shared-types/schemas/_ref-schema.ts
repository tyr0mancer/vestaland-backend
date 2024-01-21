import {z, ZodObject} from "zod";


export const RefType = (schema: ZodObject<any>) => z.union([
  z.string().regex(/^[0-9a-fA-F]{24}$/), // Regex to validate ObjectId format
  schema.partial()
]).optional()

// export const RefType = (schema: ZodObject<any>) => z.union([
//   z.string().regex(/^[0-9a-fA-F]{24}$/), // Regex to validate ObjectId format
//   schema.partial().extend({
//     _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
//   })
// ])
//
