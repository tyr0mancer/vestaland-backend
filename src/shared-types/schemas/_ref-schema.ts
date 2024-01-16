import {z, ZodType} from "zod";
import {Types} from "mongoose";

export const RefType = (schema: ZodType) => z.union([z.instanceof(Types.ObjectId), schema]).optional()
