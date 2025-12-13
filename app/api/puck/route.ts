import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { puckPages } from "../../../db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const payload = await request.json();
  const { path, data } = payload;

  try {
    // Drizzle upsert using onConflictDoUpdate
    await db.insert(puckPages)
      .values({
        path,
        data,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: puckPages.path,
        set: {
          data,
          updatedAt: new Date()
        }
      });

    // Purge Next.js cache
    revalidatePath(path);

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Error saving Puck page:", error);
    return NextResponse.json({ status: "error", message: "Failed to save page" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "/";

  try {
    const [page] = await db.select()
      .from(puckPages)
      .where(eq(puckPages.path, path))
      .limit(1);

    return NextResponse.json(page?.data || {});
  } catch (error) {
    return NextResponse.json({});
  }
}
