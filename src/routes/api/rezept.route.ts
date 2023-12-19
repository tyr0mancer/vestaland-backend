import express, {Router} from "express";
import {genericParams, validateRequest} from "../../middleware/validate-request";
import {findeRezept, getRezeptDetail} from "../../controllers/rezept.controller";


export const rezeptRouter: Router = express.Router();

rezeptRouter.get('/', findeRezept)
rezeptRouter.get('/:id', validateRequest({params: genericParams}), getRezeptDetail)
