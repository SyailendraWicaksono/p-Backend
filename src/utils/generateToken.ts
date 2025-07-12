import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'devsecret';

export const generateToken = (payload: object) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
};
