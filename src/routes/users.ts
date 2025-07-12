import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  // Simulasi database
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];

  const user = users.find(u => u.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export default router;
