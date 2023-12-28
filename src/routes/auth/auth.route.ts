import express, {Router} from "express";

import {validateRequest} from "../../middleware/validate-request";
import {benutzerSchema, changePasswordSchema} from "../../models/benutzer.model";
import {loginSchema, loginController, registerController} from "../../controllers/auth-controller";
import {refreshController} from "../../controllers/auth-controller/refresh.controller";
import {logoutController} from "../../controllers/auth-controller/logout.controller";
import {changePassword} from "../../controllers/auth-controller/changePassword.controller";
import {validateAuthorization} from "../../middleware/validate-authorization";

export const authRouter: Router = express.Router();

authRouter.post('/register', validateRequest({body: benutzerSchema}), registerController)
authRouter.post('/login', validateRequest({body: loginSchema}), loginController)
authRouter.post('/logout', logoutController)
authRouter.post('/refresh', refreshController)

authRouter.put('/change-password', validateAuthorization(), validateRequest({body: changePasswordSchema}), changePassword)
