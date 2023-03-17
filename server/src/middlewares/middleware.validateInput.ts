import { NextFunction, Request, Response } from "express";

export const validateInput = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
     const body = req.body
     try {
          const validate = await schema.validate(body);
          return next();
     } catch (error) {
          return res.status(400).json({ error: error });
     }
};
