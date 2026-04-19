import { db } from "./db";
import { Data } from "@credbuild/core";

export const getPage = async (path: string) => {
  try {
    const page = await db.credBuildPage.findUnique({
      where: { path: path }
    });

    if (!page) return null;

    return {
      ...page,
      data: page.data as Data
    };
  } catch (error) {
    console.error("Database connection error in getPage:", error);
    return null;
  }
};
