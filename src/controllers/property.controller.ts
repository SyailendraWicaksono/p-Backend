import { Request, Response } from 'express';
import prisma from '../prisma/client';

// 📌 Get all active properties
export const getProperties = async (req: Request, res: Response) => {
  type PropertyWithBigInt = {
    id: number;
    title: string; // ← ubah dari name → title
    description: string | null;
    price: bigint;
    imageUrl: string | null;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    ownerId: number | null;
};

  
    try {
      const properties = await prisma.property.findMany({
        where: { status: true, deletedAt: null }
      });
      const safeProperties = properties.map((p: PropertyWithBigInt) => ({
        ...p,
        price: p.price.toString(),  // convert BigInt ke string
      }));
  
      // 👉 kirim ke klien:
      res.json(safeProperties);
    } catch (err) {
      console.error('Error in getProperties:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
// 📌 Get property by ID
export const getPropertyById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const property = await prisma.property.findFirst({
        where: { id, deletedAt: null }
      });
  
      if (property) {
        // convert BigInt price to string
        const safeProperty = {
          ...property,
          price: property.price.toString(),
        };
        res.json(safeProperty);
      } else {
        res.status(404).json({ message: 'Property not found' });
      }
    } catch (err) {
      console.error('Error in getPropertyById:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// 📌 Create new property
export const createProperty = async (req: Request, res: Response) => {
  try {
    const { title, description, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const property = await prisma.property.create({
      data: { 
        title, 
        description, 
        price: Number(price), 
        imageUrl,
        ownerId: 1 // sementara
      }
    });

    res.status(201).json({ message: 'Property created', property });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// 📌 Update property
export const updateProperty = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description, price, status } = req.body;
  try {
    const property = await prisma.property.update({
      where: { id },
      data: { title, description, price, status }
    });
    res.json({ message: 'Property updated', property });
  } catch (err) {
    const e = err as any;
    if (e.code === 'P2025') {
      res.status(404).json({ message: 'Property not found' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// 📌 Soft delete property
export const deleteProperty = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const property = await prisma.property.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
    res.json({ message: 'Property soft deleted', property });
  } catch (err) {
    const e = err as any;
    if (e.code === 'P2025') {
      res.status(404).json({ message: 'Property not found' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
