import {Request} from "express";
import {mongoose} from "@typegoose/typegoose";

export function mayReadFilterQuery(req: Request) {
  return (req.user?.isAdmin) ? {}
    : {$or: [{publicVisible: true}, {'owner': new mongoose.Types.ObjectId(req.user?._id || '')}]}
}


export function mayWriteFilterQuery(req: Request) {
  return (req.user?.isAdmin) ? {}
    : {'owner': new mongoose.Types.ObjectId(req.user?._id || '')}
}





//@deprecated
export function getPermissionQuery(req: Request, query: Object) {
  return {
    $and: [query, (req.user?.isAdmin) ? {}
      : {$or: [{publicVisible: true}, {'owner': new mongoose.Types.ObjectId(req.user?._id || '')}]}]
  }
}
