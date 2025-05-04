import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      name: 'JohnDoe',
      email: 'john@example.com',
      password: await bcrypt.hash('password123', 10), // Hashed password
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'JaneSmith',
      email: 'jane@example.com',
      password: await bcrypt.hash('password456', 10), // Hashed password
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'SamWilson',
      email: 'sam@example.com',
      password: await bcrypt.hash('password789', 10), // Hashed password
    },
  });

  // Create Room
  const room = await prisma.room.create({
    data: {
      name: 'Friendly Chat Room',
      users: {
        connect: [
          { id: user1.id },
          { id: user2.id },
          { id: user3.id },
        ], // Add users to this room
      },
    },
  });

  // Add Messages
  const messages = [
    { userId: user1.id, content: 'Hi everyone! How’s it going?', roomId: room.id },
    { userId: user2.id, content: 'Hey John! All good here, how about you?', roomId: room.id },
    { userId: user3.id, content: 'Hi John, hi Jane! I’m doing great.', roomId: room.id },
    { userId: user1.id, content: 'I’m good too. Just finished some work and thought of catching up.', roomId: room.id },
    { userId: user2.id, content: 'That’s nice. I was about to grab a coffee. Anyone joining?', roomId: room.id },
    { userId: user3.id, content: 'I’d love to, but I have a meeting in 10 minutes. Maybe later?', roomId: room.id },
    { userId: user1.id, content: 'Coffee sounds great! I’ll join you, Jane.', roomId: room.id },
    { userId: user2.id, content: 'Awesome! Let’s meet at the café downstairs in 15 minutes.', roomId: room.id },
    { userId: user3.id, content: 'Don’t forget to grab a latte for me. I’ll join you both after my meeting.', roomId: room.id },
    { userId: user1.id, content: 'Noted! Latte for Sam.', roomId: room.id },
    { userId: user2.id, content: 'Perfect. See you soon!', roomId: room.id },
    { userId: user3.id, content: 'By the way, did you guys see the new project update?', roomId: room.id },
    { userId: user1.id, content: 'Yes, I saw it. The deadline seems tight, but manageable.', roomId: room.id },
    { userId: user2.id, content: 'Agreed. We’ll need to sync up regularly to stay on track.', roomId: room.id },
    { userId: user3.id, content: 'For sure. Let’s plan a meeting later this week.', roomId: room.id },
    { userId: user1.id, content: 'Sounds good. Friday works for me. Does it work for you both?', roomId: room.id },
    { userId: user2.id, content: 'Friday is perfect. Let’s lock it in.', roomId: room.id },
    { userId: user3.id, content: 'Friday it is then! Let’s make sure we’re well-prepared.', roomId: room.id },
    { userId: user1.id, content: 'Absolutely. We’ve got this team!', roomId: room.id },
    { userId: user2.id, content: 'Alright, see you soon for coffee!', roomId: room.id },
  ];

  await prisma.message.createMany({
    data: messages,
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
