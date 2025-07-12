import { Request, Response } from 'express';
import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 📌 Get all users (tidak menampilkan password)
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      where: { deletedAt: null },
      select: { id: true, email: true, username: true, status: true, createdAt: true }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 📌 Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  try {
    const user = await prisma.user.findFirst({
      where: { id, deletedAt: null },
      select: { id: true, email: true, username: true, status: true, createdAt: true }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 📌 Register user baru
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { email, username, password } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, username, password: hashed }
    });
    res.status(201).json({
      message: 'User created',
      user: { id: newUser.id, email: newUser.email, username: newUser.username }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 📌 Update user data
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const { email, username } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { email, username }
    });
    res.json({
      message: 'User updated',
      user: { id: user.id, email: user.email, username: user.username }
    });
  } catch (err) {
    const e = err as any;
    if (e.code === 'P2025') {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// 📌 Soft delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
    res.json({
      message: 'User soft deleted',
      user: { id: user.id, email: user.email }
    });
  } catch (err) {
    const e = err as any;
    if (e.code === 'P2025') {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    console.log('req.user:', (req as any).user);
    const { id } = (req as any).user;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        status: true // kalau ada field status di database
      }
    });
    res.json(user);
  } catch (error) {
    console.error('Error in getMe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};