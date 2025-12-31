import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function POST(request: Request) {
  const payload = await request.json();
  const { path, data } = payload;

  try {
    // Prisma upsert
    await db.puckPage.upsert({
      where: { path },
      update: {
        data: data as any,
        updatedAt: new Date(),
      },
      create: {
        path,
        data: data as any,
        updatedAt: new Date(),
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
    const page = await db.puckPage.findUnique({
      where: { path }
    });

    return NextResponse.json(page?.data || {});
  } catch (error) {
    return NextResponse.json({});
  }
}
