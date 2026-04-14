import prisma from "../src/config/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
  const username = String(process.env.ADMIN_DEFAULT_USERNAME || "admin").trim();
  const email = String(process.env.ADMIN_DEFAULT_EMAIL || "admin@horizongroup.co.jp").trim();
  const password = String(process.env.ADMIN_DEFAULT_PASSWORD || "").trim();

  if (!password) {
    throw new Error("ADMIN_DEFAULT_PASSWORD is required to seed the admin user");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { username },
    update: {
      email,
      password: hashedPassword,
      isActive: true,
    },
    create: {
      username,
      email,
      password: hashedPassword,
      isActive: true,
    },
  });

  console.log(`Admin user ready: ${username}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
