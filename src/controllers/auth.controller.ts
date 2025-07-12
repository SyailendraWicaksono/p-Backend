import { RequestHandler } from 'express';
import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';

// Register
export const register: RequestHandler = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(400).json({ message: 'Email already registered' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, username, password: hashed }
    });

    res.status(201).json({
      message: 'User registered',
      user: { id: user.id, email: user.email, username: user.username }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.deletedAt) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
