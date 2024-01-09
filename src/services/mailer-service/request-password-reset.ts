import {sendMail} from "./send-mail";
import {Benutzer} from "../../shared-types/schema/Benutzer";

export function sendRequestPasswordResetMail(benutzer: Benutzer, token: string) {
    return new Promise(async (resolve, reject) => {
        const text = `Hallo ${benutzer.name}!\n>Um ein neues Passwort zu setzen, verwende bitte diesen Code: ${token} \n\nVG Team Vestaland`
        const html = `<b>Hallo ${benutzer.name}!</b><br/><p>Um ein neues Passwort zu setzen, verwende bitte diesen Code: <b>${token}</b> </p><p>VG<br/>Team Vestaland</p>`
        const subject = "Passwort Änderung wurde angefragt";
        const to = benutzer.email;

        sendMail(to, subject, text, html).then(resolve).catch(reject);
    })
}
