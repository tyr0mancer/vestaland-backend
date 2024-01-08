import express, {Router} from "express";

import {validateRequest} from "../../middleware/validate-request";
import {
  BenutzerSchema,
  changePasswordSchema,
  loginParams,
  loginSchema,
  requestNewPasswordSchema
} from "../../shared-types/models/benutzer.schema";
import {
  loginController,
  registerController
} from "../../controllers/auth-controller";
import {refreshController} from "../../controllers/auth-controller/refresh.controller";
import {logoutController} from "../../controllers/auth-controller/logout.controller";
import {changePassword} from "../../controllers/auth-controller/changePassword.controller";
import {validateAuthorization} from "../../middleware/validate-authorization";
import {requestNewPasswordController} from "../../controllers/auth-controller/requestNewPassword.controller";
import {changePasswordAndLoginController} from "../../controllers/auth-controller/changePasswordAndLogin.controller";

export const authRouter: Router = express.Router();

authRouter.post('/register', validateRequest({body: BenutzerSchema}), registerController)
authRouter.post('/login', validateRequest({body: loginSchema}), loginController)
authRouter.post('/logout', logoutController)
authRouter.post('/refresh', refreshController)

authRouter.put('/change-password', validateAuthorization(), validateRequest({body: changePasswordSchema}), changePassword)
authRouter.post('/request-new-password', validateRequest({body: requestNewPasswordSchema}), requestNewPasswordController)
authRouter.post('/login/:token', validateRequest({params: loginParams, body: loginSchema}), changePasswordAndLoginController)
