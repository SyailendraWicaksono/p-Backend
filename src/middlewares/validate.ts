import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ errors: err.errors });
      } else {
        res.status(500).json({ message: 'Unexpected validation error' });
      }
      // Jangan return res..., biarkan fungsi berakhir secara natural
    }
  };
};
