// src/types/express/index.d.ts
import { Admin } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

export {};
