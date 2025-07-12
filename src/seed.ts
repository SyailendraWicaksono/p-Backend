import bcrypt from 'bcrypt';
import prisma from './prisma/client';

async function main() {
  console.log('🚮 Menghapus semua data lama...');
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  console.log('🔐 Hashing password...');
  const pw1 = await bcrypt.hash('270703', 10);
  const pw2 = await bcrypt.hash('123456', 10);
  const pw3 = await bcrypt.hash('345678', 10);

  console.log('👤 Menambahkan data user...');
  await prisma.user.createMany({
    data: [
      { email: 'syailendrawicaksono29@gmail.com', username: 'Syailendra', password: pw1 },
      { email: 'nameisdonald@gmail.com', username: 'Donald', password: pw2 },
      { email: 'celementine@gmail.com', username: 'Jeremy', password: pw3 },
    ],
  });

  console.log('🏡 Menambahkan data property...');
  await prisma.property.createMany({
    data: [
      {
        title: 'House 1',
        price: 1500000000,
        imageUrl: 'uploads/house1.jpg',
        ownerId: 1,
      },
      {
        title: 'House 2',
        price: 2000000000,
        imageUrl: 'uploads/house2.jpg',
        ownerId: 2,
      },
      {
        title: 'House 3',
        price: 1000000000,
        imageUrl: 'uploads/house3.jpg',
        ownerId: 3,
      },
      {
        title: 'House 4',
        price: 3500000000,
        imageUrl: 'uploads/house4.jpg',
        ownerId: 1,
      },
      {
        title: 'House 5',
        price: 500000000,
        imageUrl: 'uploads/house5.jpg',
        ownerId: 2,
      },
    ],
  });

  console.log('✅ Sukses seeding data dummy untuk User dan Property');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
