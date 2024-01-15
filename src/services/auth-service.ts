import {ApiErrorResponse, LoginResponseType, MyDocument} from "../shared-types/types";
import jwt, {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";

import config from "./config";
import {Benutzer} from "../shared-types/model/Benutzer";
import crypto from "crypto";

/**
 * Service für Authentifizierungsfunktionalitäten.
 * Beinhaltet Methoden zur Erstellung von Auth- und Refresh-Tokens sowie deren Validierung.
 */
export class AuthService {
  /**
   * Erstellt eine Login-Antwort mit Auth- und Refresh-Token.
   *
   * @param benutzer Benutzer-Objekt
   * @returns Login-Antwort-Objekt
   */
  public static getLoginResponse(benutzer: MyDocument<Benutzer>): LoginResponseType {
    const _id = benutzer._id.toString()

    // Auth-Token erstellen.
    // Dieses ist für 15 Minuten gültig und sollte im Client im Memory gespeichert werden
    const authtoken = jwt.sign({
      _id,
      name: benutzer.name,
      rollen: benutzer.rollen
    }, config.authToken.secret, {expiresIn: "15 minutes"})

    // Refresh-Token erstellen.
    // Dieses ist 24h gültig und kann zur Erstellung eines Auth-Token verwendet werden, nicht aber für andere Zugriffe
    const refreshtoken = jwt.sign({
      _id,
    }, config.refreshToken.secret, {expiresIn: "1 days"})

    return {
      _id,
      name: benutzer.name,
      email: benutzer.email,
      rollen: benutzer.rollen,
      authtoken,
      refreshtoken
    }
  }

  /**
   * Verifiziert das gegebene Token mit dem entsprechenden Geheimnis.
   *
   * @example
   * ```
   * const result = await AuthService.verifyToken<AuthTokenType>(refreshTokenString, config.refreshToken.secret)
   * if (result.error)
   *  return handleError(res, result.error)
   * ```
   *
   * @param tokenString Das zu verifizierende Token
   * @param tokenSecret Das Geheimnis zur Token-Verifikation
   *
   * @returns Ein Objekt, das den Verifizierung-Erfolg oder -fehler angibt
   */
  static async verifyToken<T>(tokenString: string, tokenSecret: string): Promise<VerifyTokenResponse<T>> {
    if (!tokenString)
      return {error: {status: 401, message: "Token fehlt"}}

    try {
      const result = await jwt.verify(tokenString, tokenSecret)
      return {value: result as T}
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        // Token ist ungültig
        return {error: {status: 401, message: "Gültigkeitsdauer des Token ist abgelaufen"}}
      } else if (e instanceof JsonWebTokenError) {
        // Token ist abgelaufen //@todo expliziten Code an Client senden?
        return {error: {status: 401, message: "Token ist ungültig"}}
      }
    }

    return {error: {status: 500, message: "Fehler"}}
  }

  static generatePasswordResetToken(tokenLength = 6) {
    const randomBytes = crypto.randomBytes(tokenLength);
    let randomString = randomBytes.toString('hex');
    randomString = randomString.substr(0, tokenLength);
    return randomString;
  }
}

/**
 Typdefinition für das Ergebnis der Token-Verifizierung.
 Enthält entweder den Wert des Tokens oder einen Fehler.
 */
export type VerifyTokenResponse<T> =
  | { value: T, error?: never } // When value is present, error must not be present
  | { value?: never, error: ApiErrorResponse }; // When error is present, value must not be present
