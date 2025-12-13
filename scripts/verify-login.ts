
import { db } from "../lib/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function main() {
    const email = "user@univedpress.com";
    const password = "user";

    console.log(`Checking login for: ${email}`);

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
        console.error("❌ User not found!");
        process.exit(1);
    }

    console.log(`User found: ${user.name} (${user.role})`);
    console.log(`Stored Hash: ${user.password}`);

    if (!user.password) {
        console.error("❌ No password set for user!");
        process.exit(1);
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
        console.log("✅ Password match! Login should work.");
    } else {
        console.error("❌ Password mismatch! The stored hash does not match 'user'.");
        // Re-hash and update to fix it
        const newHash = await bcrypt.hash(password, 10);
        await db.update(users).set({ password: newHash }).where(eq(users.email, email));
        console.log("🛠️ Password reset to 'user' done. Try logging in again.");
    }
    process.exit(0);
}

main().catch(console.error);
