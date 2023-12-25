import {Request, Response} from "express";
import {sendGenericServerError} from "../../middleware/error-handler";

export function logoutController(req: Request, res: Response) {
  try {
    // RefreshToken Cookie löschen
    res.cookie(process.env.REFRESH_TOKEN_COOKIE || 'REFRESH_TOKEN_COOKIE', '',
      {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0,
        path: "/"
      });
    return res.status(204).send()
  } catch (error) {
    sendGenericServerError(res, error)
  }

}
