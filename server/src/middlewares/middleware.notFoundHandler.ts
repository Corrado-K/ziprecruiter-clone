import { Request, Response } from "express";

export const NotFoundHandler = (req: Request, res: Response) => {
     res.status(404).json({
          message: `${req.method} ${req.path} was not found❌`,
          status: 404,
     });
};
