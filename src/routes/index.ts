import * as express from "express";
import {genericRouter} from "./generic/generic-router";

import {Rezept, RezeptModel, RezeptSchema} from "../models/rezept.model";
import {Utensil, UtensilModel, UtensilSchema} from "../models/utensil.model";
import {authRouter} from "./auth/auth.route";
import {rezeptRouter} from "./api/rezept.route";
import {lebensmittelRouter} from "./api/lebensmittel.route";
import {dateiRouter} from "./api/datei.route";
import {Essensplan, EssensplanModel, essensplanSchema} from "../models/essensplan.model";
import {Lagerort, LagerortModel, lagerortSchema} from "../models/lagerort.model";
import {sendMail} from "../services/mailer-service/send-mail";
import {handleGenericServerError} from "../middleware/error-handler";
import {KochschrittAktion, KochschrittAktionModel, KochschrittAktionSchema} from "../models/kochschritt-aktion.model";
import {configRouter} from "./api/config.route";
import {Vorrat, VorratModel, vorratSchema} from "../models/vorrat.model";
import {utensilRouter} from "./api/utensil.route";
import {einkaufslistenRouter} from "./api/einkaufsliste.route";

const apiRouter = express.Router();

// Authentication
apiRouter.use('/auth', authRouter);

// specific Api-Routes
apiRouter.use('/rezept', rezeptRouter);
apiRouter.use('/lebensmittel', lebensmittelRouter);
apiRouter.use('/utensil', utensilRouter);
apiRouter.use('/datei', dateiRouter);

apiRouter.use('/einkaufsliste', einkaufslistenRouter);

apiRouter.use('/config', configRouter);


// generic Routes
apiRouter.use('/rezept', genericRouter<Rezept>(RezeptModel, RezeptSchema));
apiRouter.use('/utensil', genericRouter<Utensil>(UtensilModel, UtensilSchema));
apiRouter.use('/essensplan', genericRouter<Essensplan>(EssensplanModel, essensplanSchema));
apiRouter.use('/lagerort', genericRouter<Lagerort>(LagerortModel, lagerortSchema));
apiRouter.use('/vorrat', genericRouter<Vorrat>(VorratModel, vorratSchema));

apiRouter.use('/config/aktionen', genericRouter<KochschrittAktion>(KochschrittAktionModel, KochschrittAktionSchema));

export const mainRouter = express.Router();
mainRouter.use('/api', apiRouter)

// test and documentation
mainRouter.get('/', (req, res) => res.send('Hello Mundo!'));
mainRouter.get('/mail-test', (req, res) => {
  sendTestmail("mail@alex-gross.de").then(() =>
    res.send('mail sent!'))
    .catch(error => handleGenericServerError(res, error))
})


function sendTestmail(to: string) {
  const neuesPasswort = "what!"
  const benutzerName = "Mr Beast Fuck The World"

  return new Promise(async (resolve, reject) => {
    const text = `Hallo ${benutzerName}!\nIhr neues Passwort lautet: ${neuesPasswort} \n\nVG Team Vestaland`
    const html = `<b>Hallo ${benutzerName}!</b><br/><p>Ihr neues Passwort lautet: <b>${neuesPasswort}</b></p><p>VG<br/>Team Vestaland</p>`
    const subject = "Ihr neues Passwort ⚠";

    sendMail(to, subject, text, html).then(resolve).catch(reject);
  })
}
