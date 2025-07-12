import { Request, Response } from 'express';
import { hashPassword, comparePasswords } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getAdmins = async (req: Request, res: Response): Promise<void> => {
  const admins = await prisma.admin.findMany();
  res.json(admins);
};

export const getAdminById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const admin = await prisma.admin.findUnique({ where: { id } });

  if (!admin) {
    res.status(404).json({ message: 'Admin not found' });
    return;
  }

  res.json(admin);
};

export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const hashed = await hashPassword(password);
    const newAdmin = await prisma.admin.create({
      data: { username, email, password: hashed }
    });
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create admin', error });
  }
};

export const updateAdmin = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  try {
    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: req.body
    });
    res.json(updatedAdmin);
  } catch (error) {
    res.status(404).json({ message: 'Admin not found or update failed' });
  }
};

export const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  try {
    await prisma.admin.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Admin not found or delete failed' });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    res.status(400).json({ message: 'Email already in use' });
    return;
  }

  const hashed = await hashPassword(password);
  const newAdmin = await prisma.admin.create({
    data: { username, email, password: hashed }
  });

  res.status(201).json({ id: newAdmin.id, username: newAdmin.username, email: newAdmin.email });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin || !(await comparePasswords(password, admin.password))) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = generateToken({ id: admin.id, email: admin.email });
  res.json({ token });
};
