import * as express from "express";

import {authRouter} from "./auth-router";
import {apiRouter} from "./api-router";
import {configRouter} from "./config-router";
import {authenticateRequest} from "../middleware/auth/authenticateRequest";

/**
 * Führt die sub-router zusammen
 *
 * @example
 * // app.ts:
 * app.use('/', mainRouter)
 *
 * @see apiRouter
 * ('/api-controller-router' API Endpoints)
 * @see authRouter
 * ('/auth' Login, Logout, Register, ...)
 * @see configRouter
 * ('/config')
 */
export const mainRouter = express.Router();
mainRouter.use(authenticateRequest)

mainRouter.use('/api', apiRouter)
mainRouter.use('/api/auth', authRouter) //@todo -> move to '/auth'
mainRouter.use('/config', configRouter)

/**
 * TestRoute
 */
mainRouter.get('/', (req, res) => res.send('Hello Mundo!' + ((req.user) ? `
Aktuell angemeldet als
${JSON.stringify(req.user)}` : '')));
