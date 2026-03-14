import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const reflection = await prisma.reflection.findFirst({
    orderBy: { uploadedAt: 'desc' },
  });
  console.log('Reflection Row:', JSON.stringify(reflection, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
