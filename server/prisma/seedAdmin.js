import prisma from "../src/config/prisma";
import bcrypt from "bcryptjs";

async function main() {
    const hashedPassword = await bcrypt.hash("admin123, 10");

    await prisma.admin.create({
        data:{
            username: "admin",
            email: "admin@horizongroup.co.jp",
            password: hashedPassword
        }
    });
    console.log("Admin created");
}

main()
    .catch(e => console.error(e))
    .finally(() =>prisma.$disconnect());