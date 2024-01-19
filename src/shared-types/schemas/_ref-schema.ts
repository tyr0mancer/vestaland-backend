import {z, ZodObject} from "zod";
import {Types} from "mongoose";

export const RefType = (schema: ZodObject<any>) => z.union([z.instanceof(Types.ObjectId), schema.partial()]).optional()
