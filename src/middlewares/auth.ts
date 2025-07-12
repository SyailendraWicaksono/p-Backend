import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'devsecret';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    (req as any).user = payload; // kalau belum tambahkan type di typings
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
