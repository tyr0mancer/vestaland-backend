import {Request, Response} from "express";
import bcrypt from "bcryptjs";

import {AuthTokenType} from "../shared-types/types";
import {Benutzer} from "../shared-types/models/Benutzer";

import config from "../services/config";
import {AuthService, MyDocument} from "../services/auth-service";
import {BenutzerModel} from "../services/database-service";
import {handleError, sendErrorResponse} from "../services/error-handler";
import {generatePasswordHash, generateTokenHash} from "../services/crypt-service";
import {MailerService} from "../services/mailer-service";
import {AUTH_NO_TOKEN_ERROR_MESSAGE} from "../shared-types/config";


/**
 * Controller für Authentifizierungsvorgänge.
 * Beinhaltet Methoden für Login, Refresh-Token-Handling und Logout.
 */
export class AuthController {
  /**
   * Verarbeitet Benutzer-Logins.
   * Überprüft Benutzerdaten und sendet entsprechende Antwort.
   *
   * @param req HTTP-Anfrage
   * @param res HTTP-Antwort
   */
  public static async login(req: Request, res: Response) {
    const benutzer = await BenutzerModel.findOne({email: req.body.username})

    // Kein Benutzer mit dieser Email gefunden
    if (!benutzer)
      return AuthController.sendLoginError(res)

    if (!benutzer.mayLogin)
      return sendErrorResponse(res, 403, "Der Account ist aktuell nicht aktiviert. Bitte kontaktieren Sie einen Administrator.")

    // Passwort falsch
    const isValid = await bcrypt.compare(req.body.password, benutzer.password)
    if (!isValid)
      return AuthController.sendLoginError(res)

    await AuthController.sendLoginSuccess(res, benutzer)
  }

  /**
   * Erneuert das Auth-Token mit dem Refresh-Token.
   * Validiert das vorhandene Refresh-Token und sendet ein neues Auth-Token.
   *
   * @param req HTTP-Anfrage
   * @param res HTTP-Antwort
   */
  public static async refresh(req: Request, res: Response) {
    // Lese Token aus dem Refresh Cookie des Clients
    const refreshTokenString = req.cookies[config.refreshTokenCookie.name]
    if (!refreshTokenString)
      return sendErrorResponse(res, 401, AUTH_NO_TOKEN_ERROR_MESSAGE)

    // Entschlüssele Token
    const result = await AuthService.verifyToken<AuthTokenType>(refreshTokenString, config.refreshToken.secret)
    if (result.error)
      return handleError(res, result.error)

    // Finde zugehörigen Benutzer um Rechte etc. anzupassen und zu prüfen, ob der Benutzer noch existiert
    const benutzer = await BenutzerModel.findOne({_id: result.value?._id, mayLogin: true})
    if (!benutzer)
      return sendErrorResponse(res, 403, "Benutzer zu Token existiert nicht (mehr)")

    await AuthController.sendLoginSuccess(res, benutzer)
  }

  /**
   * Behandelt den Logout-Prozess durch Entfernen des Refresh-Cookies im Client
   *
   * @param req HTTP-Anfrage
   * @param res HTTP-Antwort
   */
  public static logout(req: Request, res: Response) {
    res.cookie(config.refreshTokenCookie.name, '',
      {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0,
        path: "/"
      });
    return res.status(204).send()
  }


  /**
   * Behandelt die Anfrage für ein neues Passwort. Es wird ein Secret Token generiert und an die
   * E-Mail-Adresse des Benutzers gesendet, wenn ein Benutzer mit dieser E-Mail existiert.
   *
   * @param req - Der Request-Objekt, das die E-Mail-Adresse des Benutzers enthält.
   * @param res - Das Response-Objekt, das für die Rückantwort verwendet wird.
   */
  public static async requestNewPasswordSecret(req: Request, res: Response) {
    const benutzer = await BenutzerModel.findOne({email: req.body.email, mayLogin: true})

    if (benutzer) {
      const token = AuthService.generatePasswordResetToken()
      benutzer.resetPasswordHash = await generateTokenHash(token)
      benutzer.resetPasswordExpires = new Date(new Date().getTime() + 30 * 60 * 1000)

      const mailer = new MailerService(config.testMailer)
      await mailer.sendRequestPasswordResetMail(benutzer, token)
      await benutzer.save()
    }
    return res.status(204).send("Falls ein Benutzer mit dieser Email existiert, wurde eine Mail mit weiteren Infos an diese Adresse versendet")
  }

  /**
   * Ermöglicht dem Benutzer, das Passwort zu ändern, indem ein Secret Token und ein neues Passwort angegeben werden.
   * Wenn das Token gültig ist und das Passwort erfolgreich geändert wurde, wird der Benutzer eingeloggt.
   *
   * @param req - Der Request-Objekt, das das neue Passwort und das Token enthält.
   * @param res - Das Response-Objekt, das für die Rückantwort verwendet wird.
   */
  public static async changePasswordAndLogin(req: Request, res: Response) {

    const benutzer = await BenutzerModel.findOne({email: req.body.email, mayLogin: true})
    if (!benutzer)
      return sendErrorResponse(res, 401, "Konnte Passwort nicht ändern")

    // Vergleiche hashwert des Token mit den Eintrag in der DB
    const tokenHash = await generateTokenHash(req.body.token)
    if (benutzer.resetPasswordHash !== tokenHash)
      return sendErrorResponse(res, 403, 'Token ungültig')

    // Prüfe, ob es noch gültig ist
    if (!benutzer.resetPasswordExpires || benutzer.resetPasswordExpires < new Date())
      return sendErrorResponse(res, 403, 'Token abgelaufen')

    benutzer.resetPasswordHash = undefined
    benutzer.resetPasswordExpires = undefined
    benutzer.password = await generatePasswordHash(req.body.password)
    await benutzer.save()
    return AuthController.sendLoginSuccess(res, benutzer)
  }


  /* ******************************* private Member ******************************* */

  /**
   * absichtlich generische Fehlermeldung
   * @param res
   * @private
   */
  private static sendLoginError(res: Response) {
    return sendErrorResponse(res, 403, "Email / Passwort Kombination passt nicht")
  }

  /**
   * erstelle Objekt vom Typ LoginResponseType aus Benutzerdaten
   * @param res
   * @param benutzer
   * @private
   */
  private static async sendLoginSuccess(res: Response, benutzer: MyDocument<Benutzer>) {
    const loginResponse = await AuthService.getLoginResponse(benutzer)
    res.cookie(config.refreshTokenCookie.name, loginResponse.refreshtoken,
      {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: config.refreshTokenCookie.maxAge,
        path: "/"
      });
    return res.status(200).json(loginResponse)
  }

}

