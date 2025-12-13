
import "dotenv/config";
import { db } from "../lib/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function main() {
    const usersToSeed = [
        { email: "admin@univedpress.com", password: "admin", name: "Admin User", role: "admin" },
        { email: "editor@univedpress.com", password: "editor", name: "Editor User", role: "editor" },
        { email: "user@univedpress.com", password: "user", name: "Regular User", role: "user" },
    ];

    console.log("Seeding users...");

    for (const u of usersToSeed) {
        const [existingUser] = await db.select().from(users).where(eq(users.email, u.email));
        const hashedPassword = await bcrypt.hash(u.password, 10);

        if (existingUser) {
            console.log(`Updating ${u.role}: ${u.email}`);
            await db.update(users)
                .set({ password: hashedPassword, role: u.role, name: u.name })
                .where(eq(users.email, u.email));
        } else {
            console.log(`Creating ${u.role}: ${u.email}`);
            await db.insert(users).values({
                name: u.name,
                email: u.email,
                password: hashedPassword,
                role: u.role
            });
        }
    }

    console.log("Done seeding user.");
    process.exit(0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
