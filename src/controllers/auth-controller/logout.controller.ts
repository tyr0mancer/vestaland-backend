import {Request, Response} from "express";
import {handleGenericServerError} from "../../middleware/error-handler";
import config from "../../config";

export function logoutController(req: Request, res: Response) {
  try {
    // RefreshToken Cookie löschen
    res.cookie(config.refreshTokenCookieName, '',
      {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0,
        path: "/"
      });
    return res.status(204).send()
  } catch (error) {
    handleGenericServerError(res, error)
  }

}
