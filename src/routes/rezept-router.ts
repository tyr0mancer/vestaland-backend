import express, {Router} from "express";
import {RezeptModel} from "../models/rezept.model";
import {validateRequest} from "../middleware/validate-request";
import {genericParamsSchema} from "./generic-router";


const router: Router = express.Router();

// Suche
router.get('/',
  async (req, res) => {
    let query: { [key: string]: any } = {};

    if (req.query.name && typeof req.query.name == "string") {
      query.name = new RegExp(req.query.name, 'i');
    }

    // @todo implement more filter
    if (req.query.zutaten && typeof req.query.zutaten == "string") {
      const zutaten = req.query.zutaten.split(',');
      query.zutaten = {$in: {lebensmittel: {$in: zutaten}}};
    }

    try {
      const rezepte = await RezeptModel.find(query);
      res.status(200).json(rezepte).send();
    } catch (error) {
      res.status(500).json(error).send();
    }
  })


// Suche
router.get('/:id',
  validateRequest(genericParamsSchema),
  async (req, res) => {
    try {
      const rezept = await RezeptModel
        .findById(req.params.id)
        .populate({path: 'zutaten.lebensmittel'})
        .populate({path: 'hilfsmittel'})
        .populate({path: 'arbeitsschritte.zutaten.lebensmittel'})
        .populate({path: 'arbeitsschritte.hilfsmittel'})

      res.status(200).json(rezept).send();
    } catch (error) {
      res.status(500).json(error).send();
    }
  })


export default router;
