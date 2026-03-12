import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function main() {
  const email = "tester_rt2@example.com";
  const password = "Password123!";
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      auth_status: "V",
    },
    create: {
      email,
      password: hashedPassword,
      auth_status: "V",
      is_admin: true,
    },
  });

  console.log(`User ${user.email} created/updated and approved.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
