import nodemailer, {Transporter} from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import config from "./config";
import {Benutzer} from "../shared-types/model/Benutzer";


/**
 * Diese Klasse stellt den Service zum Versenden von E-Mails dar.
 * Sie verwendet nodemailer, um E-Mails über einen SMTP-Transport zu senden.
 */
export class MailerService {
  transporter: Transporter<SMTPTransport.SentMessageInfo> | null = null

  /**
   * Erstellt eine neue Instanz des MailerService.
   *
   * @param testMail - Ein Boolean-Wert, der angibt, ob der Test-E-Mail-Dienst verwendet werden soll.
   */
  constructor(testMail: boolean) {
    const {host, port, user, pass} = testMail ? config.smtpTest : config.smtp
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: true,
      auth: {user, pass},
      tls: {rejectUnauthorized: false}
    })
  }

  /**
   * Sendet eine E-Mail zur Anfrage eines Passwort-Resets.
   *
   * @param benutzer - Das Benutzerobjekt, welches den Namen und die E-Mail-Adresse enthält.
   * @param token - Der Token, der in der E-Mail zum Zurücksetzen des Passworts verwendet wird.
   * @returns Ein Promise, das aufgelöst wird, wenn die E-Mail erfolgreich gesendet wurde.
   */
  public async sendRequestPasswordResetMail(benutzer: Benutzer, token: string) {
    const text = `Hallo ${benutzer.name}!\n>Um ein neues Passwort zu setzen, verwende bitte diesen Code: ${token} \n\nVG Team Vestaland`
    const html = `<b>Hallo ${benutzer.name}!</b><br/><p>Um ein neues Passwort zu setzen, verwende bitte diesen Code: <b>${token}</b> </p><p>VG<br/>Team Vestaland</p>`
    const subject = "Passwort Änderung wurde angefragt";
    const to = benutzer.email;
    return this.sendMail(to, subject, text, html)
  }


  /* ******************************* private Member ******************************* */
  private async sendMail(to: string, subject: string, text: string, html?: string) {
    if (!this.transporter)
      return

    await this.transporter.sendMail({
      from: '"Team Vestaland 🍽" <team@vestaland.de>',
      to,
      subject,
      text,
      html
    })
  }

}
