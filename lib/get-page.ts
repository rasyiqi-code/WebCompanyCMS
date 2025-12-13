import { db } from "./db";
import { puckPages } from "../db/schema";
import { eq } from "drizzle-orm";
import { Data } from "@measured/puck";

export const getPage = async (path: string) => {
  const [page] = await db.select()
    .from(puckPages)
    .where(eq(puckPages.path, path))
    .limit(1);

  if (!page) return null;

  return {
    ...page,
    data: page.data as Data
  };
};
