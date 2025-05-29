import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.train.deleteMany();
  await prisma.station.deleteMany();
  await prisma.stop.deleteMany();

  await prisma.station.createMany({
    data: [
      { name: 'Lviv' },
      { name: 'Kropyvnytskyi' },
      { name: 'Vinnytsia' },
      { name: 'Kyiv' },
      { name: 'Mariupol' },
      { name: 'Kharkiv' },
      { name: 'Odesa' },
      { name: 'Simpheropol' },
      { name: 'Zaporizhzhia' },
      { name: 'Dnipro' },
    ],
  });

  await prisma.train.createMany({
    data: [
      { trainNumber: 'Train-001' },
      { trainNumber: 'Train-002' },
      { trainNumber: 'Train-003' },
      { trainNumber: 'Train-004' },
      { trainNumber: 'Train-005' },
    ],
  });

  await prisma.train.update({
    where: {
      trainNumber: 'Train-001',
    },
    data: {
      stops: {
        createMany: {
          data: [
            {
              stationName: 'Lviv',
              arrivalTime: new Date('2023-10-01T10:00:00Z'),
              departureTime: new Date('2023-10-01T10:30:00Z'),
              stopOrder: 1,
            },
            {
              stationName: 'Vinnytsia',
              arrivalTime: new Date('2023-10-01T12:00:00Z'),
              departureTime: new Date('2023-10-01T12:30:00Z'),
              stopOrder: 2,
            },
            {
              stationName: 'Kropyvnytskyi',
              arrivalTime: new Date('2023-10-01T14:00:00Z'),
              departureTime: new Date('2023-10-01T14:30:00Z'),
              stopOrder: 3,
            },
            {
              stationName: 'Zaporizhzhia',
              arrivalTime: new Date('2023-10-01T16:00:00Z'),
              departureTime: new Date('2023-10-01T16:30:00Z'),
              stopOrder: 4,
            },
          ],
        },
      },
    },
  });

  await prisma.train.update({
    where: {
      trainNumber: 'Train-002',
    },
    data: {
      stops: {
        createMany: {
          data: [
            {
              stationName: 'Zaporizhzhia',
              arrivalTime: new Date('2023-10-01T11:00:00Z'),
              departureTime: new Date('2023-10-01T11:30:00Z'),
              stopOrder: 1,
            },
            {
              stationName: 'Odesa',
              arrivalTime: new Date('2023-10-01T13:00:00Z'),
              departureTime: new Date('2023-10-01T13:30:00Z'),
              stopOrder: 2,
            },
            {
              stationName: 'Simpheropol',
              arrivalTime: new Date('2023-10-01T15:00:00Z'),
              departureTime: new Date('2023-10-01T15:30:00Z'),
              stopOrder: 3,
            },
            {
              stationName: 'Kyiv',
              arrivalTime: new Date('2023-10-01T17:00:00Z'),
              departureTime: new Date('2023-10-01T17:30:00Z'),
              stopOrder: 4,
            },
            {
              stationName: 'Lviv',
              arrivalTime: new Date('2023-10-01T19:00:00Z'),
              departureTime: new Date('2023-10-01T19:30:00Z'),
              stopOrder: 5,
            },
          ],
        },
      },
    },
  });
}

main()
  .then(() => {
    console.log('Seeding completed successfully');
    return prisma.$disconnect();
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
    return prisma.$disconnect();
  });
