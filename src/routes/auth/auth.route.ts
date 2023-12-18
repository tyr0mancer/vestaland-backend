import express, {Router} from "express";

import {validateRequest} from "../../middleware/validate-request";
import {benutzerSchema} from "../../models/benutzer.model";
import {loginSchema, loginController, registerController} from "../../controllers/auth-controller";
import {refreshController} from "../../controllers/auth-controller/refresh.controller";

export const authRouter: Router = express.Router();

authRouter.post('/register', validateRequest({body: benutzerSchema}), registerController)
authRouter.post('/login', validateRequest({body: loginSchema}), loginController)
authRouter.post('/refresh', refreshController)
