import {Request, Response, NextFunction} from 'express';

export const validateAuthorization = (requiredRole?: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (requiredRole) {
        return res.status(500).send("Sie müssen hierzu angemeldet sein")
      }
      next()
    };
  }
;
