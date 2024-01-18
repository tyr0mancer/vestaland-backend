import * as express from "express";
import path from "path";

import {authenticateRequest} from "../middleware/auth/authenticateRequest";

import {authRouter} from "./auth-router";
import {apiRouter} from "./api-router";
import {configRouter} from "./config-router";


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
mainRouter.use('/api', authenticateRequest, apiRouter)
mainRouter.use('/auth', authRouter)
mainRouter.use('/config', configRouter)


/**
 * Statischer Inhalt wie Bilder oder die Dokumentation
 */
const publicPath = path.join(__dirname, '../../public')
mainRouter.use('/public', express.static(publicPath));


/**
 * TestRoute
 */
mainRouter.get('/docs', (req, res) => res.redirect('/public/docs'))
mainRouter.get('/', (req, res) => res.send('Hello Mundo!' + ((req.user) ? `
Aktuell angemeldet als ${JSON.stringify(req.user)}` : '')));
