import express, {Router} from "express";
import {validateRequest} from "../middleware/validate-request";
import {erstelleLebensmittelController, findeLebensmittelController} from "../controllers/lebensmittel.controller";
import {validateAuthorization} from "../middleware/validate-atuhorization";
import {lebensmittelSchema} from "../models/lebensmittel.model";
import {z} from "zod";


const router: Router = express.Router();


// Suche
router.get('/',
  findeLebensmittelController)

router.post('/',
  validateAuthorization(['redakteur']),
  validateRequest({body: lebensmittelSchema}),
  erstelleLebensmittelController)

router.post('/import/',
  //validateAuthorization(['admin']),
  validateRequest({body: z.array(lebensmittelSchema)}),
  erstelleLebensmittelController)

export default router;
