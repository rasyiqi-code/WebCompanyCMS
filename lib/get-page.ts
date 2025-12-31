import { db } from "./db";
import { Data } from "@measured/puck";

export const getPage = async (path: string) => {
  const page = await db.puckPage.findUnique({
    where: { path: path }
  });

  if (!page) return null;

  return {
    ...page,
    data: page.data as Data
  };
};
