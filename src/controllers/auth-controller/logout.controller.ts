import {Request, Response} from "express";
import {catchError} from "../generic-controller";

export function logoutController(req: Request, res: Response) {
  try {
    // RefreshToken Cookie löschen
    res.cookie(process.env.REFRESH_TOKEN_COOKIE || 'REFRESH_TOKEN_COOKIE', null,
      {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 86_400_000,
        path: "/"
      });
    return res.status(204).send()
  } catch (error) {
    catchError(res, error)
  }

}
