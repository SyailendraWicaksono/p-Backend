import express from 'express';
import cors from 'cors'; // ⬅️ import cors

import userRoutes from './routes/user.routes';
import propertyRoutes from './routes/property.routes';
import authRoutes from './routes/auth.routes';

const app = express();

// ⬇️ Pasang middleware cors dulu sebelum route
app.use(cors({
  origin: [
    'http://localhost:3001',
    'https://p-frontend-snowy.vercel.app'
  ], // frontend Next.js
  credentials: true
}));

app.use(express.json());

// ⬇️ Baru kemudian semua route
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
