import {sendMail} from "./send-mail";
import {Benutzer} from "../../models/benutzer.model";

export function sendRequestPasswordResetMail(benutzer: Benutzer, token: string) {
    return new Promise(async (resolve, reject) => {
        const tokenUrl = `${process.env.FRONTEND_BASE_URL}/${process.env.FRONTEND_RESET_PASSWORD}/${token}`
        const text = `Hallo ${benutzer.name}!\nDu willst dein Passwort zurück setzen, dann klicke hier: ${tokenUrl} \n\nVG Team Vestaland`
        const html = `<b>Hallo ${benutzer.name}!</b><br/><p>Du willst dein Passwort zurück setzen, dann <a href="${tokenUrl}">klicke hier</a></p><p>VG<br/>Team Vestaland</p>`
        const subject = "Passwort Änderung wurde angefragt ⚠";
        const to = benutzer.email;

        sendMail(to, subject, text, html).then(resolve).catch(reject);
    })
}
