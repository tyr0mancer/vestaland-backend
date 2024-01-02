import * as express from "express";
import {genericRouter} from "./generic/generic-router";

import {Rezept, RezeptModel, rezeptSchema} from "../models/rezept.model";
import {Lebensmittel, LebensmittelModel, lebensmittelSchema} from "../models/lebensmittel.model";
import {Hilfsmittel, HilfsmittelModel, hilfsmittelSchema} from "../models/hilfsmittel.model";
import {Einkaufsliste, EinkaufslisteModel, einkaufslisteSchema} from "../models/einkaufsliste.model";
import {authRouter} from "./auth/auth.route";
import {rezeptRouter} from "./api/rezept.route";
import {lebensmittelRouter} from "./api/lebensmittel.route";
import {dateiRouter} from "./api/datei.route";
import {Essensplan, EssensplanModel, essensplanSchema} from "../models/essensplan.model";
import {Vorrat, VorratModel, vorratSchema} from "../models/vorrat.model";
import {Lagerort, LagerortModel, lagerortSchema} from "../models/lagerort.model";
import {sendMail} from "../services/mailer-service/send-mail";
import {handleGenericServerError} from "../middleware/error-handler";
import {KochschrittAktionModel, KochschrittAktionSchema} from "../models/kochschritt-aktion.model";

const apiRouter = express.Router();

// Authentication
apiRouter.use('/auth', authRouter);

// specific Api-Routes
apiRouter.use('/rezept', rezeptRouter);
apiRouter.use('/lebensmittel', lebensmittelRouter);
apiRouter.use('/datei', dateiRouter);

// generic Routes
apiRouter.use('/rezept', genericRouter<Rezept>(RezeptModel, rezeptSchema));
apiRouter.use('/lebensmittel', genericRouter<Lebensmittel>(LebensmittelModel, lebensmittelSchema));
apiRouter.use('/hilfsmittel', genericRouter<Hilfsmittel>(HilfsmittelModel, hilfsmittelSchema));

apiRouter.use('/einkaufsliste', genericRouter<Einkaufsliste>(EinkaufslisteModel, einkaufslisteSchema));
apiRouter.use('/essensplan', genericRouter<Essensplan>(EssensplanModel, essensplanSchema));
apiRouter.use('/lagerort', genericRouter<Lagerort>(LagerortModel, lagerortSchema));
apiRouter.use('/vorrat', genericRouter<Vorrat>(VorratModel, vorratSchema));

apiRouter.use('/config/aktionen', genericRouter<Vorrat>(KochschrittAktionModel, KochschrittAktionSchema));

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
  const neuesPasswort = "PasswORT!"
  const benutzerName = "Mr Beast Fuck The World"

  return new Promise(async (resolve, reject) => {
    const text = `Hallo ${benutzerName}!\nIhr neues Passwort lautet: ${neuesPasswort} \n\nVG Team Vestaland`
    const html = `<b>Hallo ${benutzerName}!</b><br/><p>Ihr neues Passwort lautet: <b>${neuesPasswort}</b></p><p>VG<br/>Team Vestaland</p>`
    const subject = "Ihr neues Passwort ⚠";

    sendMail(to, subject, text, html).then(resolve).catch(reject);
  })
}
