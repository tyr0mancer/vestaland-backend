import express, {Router} from "express";

import {validateRequest} from "../middleware/validate-request";
import {AuthController} from "../controllers/auth-controller";
import {
  LoginSchema,
  ChangePasswordSchema,
  RequestNewPasswordSecretTokenSchema
} from "../shared-types/model/benutzer-schema";


/**
 * Definiert Routen für Authentifizierungsvorgänge.
 * Unterstützt Login, Token-Refresh, Logout
 * sowie die Möglichkeit, ein vergessenes Passwort zurückzusetzen
 */
export const authRouter: Router = express.Router();

// Benutzer-Login
authRouter.post('/login',
  validateRequest({body: LoginSchema}),
  AuthController.login
)

// Aktualisierung des Auth-Tokens mit Authentifizierung durch Refresh Token
authRouter.post('/refresh', AuthController.refresh)

// Benutzer-Logout
authRouter.post('/logout', AuthController.logout)

// Benutzer fordert Secret Token an um das Passwort zu ändern
authRouter.post('/request-new-password',
  validateRequest({body: RequestNewPasswordSecretTokenSchema}),
  AuthController.requestNewPasswordSecret
)

// Benutzer gibt Secret Token und neues Passwort an
authRouter.post('/change-password',
  validateRequest({body: ChangePasswordSchema}),
  AuthController.changePasswordAndLogin
)
