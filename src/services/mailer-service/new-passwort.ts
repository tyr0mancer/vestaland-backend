import {sendMail} from "./send-mail";
import {Benutzer} from "../../models/benutzer.model";

export function sendNewPasswordMail(benutzer: Benutzer, neuesPasswort: string) {
    return new Promise(async (resolve, reject) => {
        const text = `Hallo ${benutzer.name}!\nIhr neues Passwort lautet: ${neuesPasswort} \n\nVG Team Vestaland`
        const html = `<b>Hallo ${benutzer.name}!</b><br/><p>Ihr neues Passwort lautet: <b>${neuesPasswort}</b></p><p>VG<br/>Team Vestaland</p>`
        const subject = "Ihr neues Passwort ⚠";
        const to = benutzer.email;

        sendMail(to, subject, text, html).then(resolve).catch(reject);
    })
}



