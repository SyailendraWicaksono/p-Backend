import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getProjectIdeas = async (req: Request, res: Response): Promise<void> => {
  const ideas = await prisma.projectIdea.findMany();
  res.json(ideas);
};

export const getProjectIdeaById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const idea = await prisma.projectIdea.findUnique({ where: { id } });

  if (!idea) {
    res.status(404).json({ message: 'Project idea not found' });
    return;
  }

  res.json(idea);
};

export const createProjectIdea = async (req: Request, res: Response): Promise<void> => {
  const { title, description, category, difficulty, adminId } = req.body;

  try {
    const newIdea = await prisma.projectIdea.create({
      data: {
        title,
        description,
        category,
        difficulty,
        admin: { connect: { id: adminId } }
      }
    });
    res.status(201).json(newIdea);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create project idea', error });
  }
};

export const updateProjectIdea = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const { title, description } = req.body;

  try {
    const updated = await prisma.projectIdea.update({
      where: { id },
      data: { title, description }
    });
    res.json(updated);
  } catch (error) {
    res.status(404).json({ message: 'Project idea not found or update failed' });
  }
};

export const deleteProjectIdea = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);

  try {
    await prisma.projectIdea.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Project idea not found or delete failed' });
  }
};
