import express, {Router} from "express";

import {findeAktionenController} from "../../controllers/api/config.controller";
import {authenticateToken} from "../../middleware/authenticate-token";

export const configRouter: Router = express.Router();


configRouter.get('/aktionen',
  authenticateToken,
  findeAktionenController)
