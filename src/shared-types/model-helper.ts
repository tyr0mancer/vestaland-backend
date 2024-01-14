import {z} from "zod";

export class TimeStamps {
  public _id?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

export type Ref<T> = T // | string //ObjectId

/**
 * SchemaDefinition um MongoDB typische Properties als optional hinzuzufügen
 */
export const MongoExtension = {
  _id: z.string().optional(),         // MongoDB ObjectId
  __v: z.number().optional(),         // Version key
  updatedAt: z.any().optional(),     // updatedAt timestamp
  createdAt: z.any().optional(),     // createdAt timestamp
}
