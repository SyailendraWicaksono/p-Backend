import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // pastikan sudah extend di `index.d.ts`
    next();
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
};
const router = express.Router();
export default router;
