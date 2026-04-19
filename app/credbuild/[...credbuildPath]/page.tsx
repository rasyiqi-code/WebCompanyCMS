/**
 * This file implements a *magic* catch-all route that renders the CredBuild editor.
 *
 * This route exposes /credbuild/[...credbuildPath], but is disabled by middleware.ts. The middleware
 * then rewrites all URL requests ending in `/edit` to this route, allowing you to visit any
 * page in your application and add /edit to the end to spin up a CredBuild editor.
 *
 * This approach enables public pages to be statically rendered whilst the /credbuild route can
 * remain dynamic.
 *
 * NB this route is public, and you will need to add authentication
 */

import "@credbuild/core/credbuild.css";
import { Client } from "./client";
import { Metadata } from "next";
import { getPage } from "../../../lib/get-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ credbuildPath: string[] }>;
}): Promise<Metadata> {
  const { credbuildPath = [] } = await params;
  const path = `/${credbuildPath.join("/")}`;

  return {
    title: "CredBuild: " + path,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ credbuildPath: string[] }>;
}) {
  const { credbuildPath = [] } = await params;
  const path = `/${credbuildPath.join("/")}`;
  const data = await getPage(path);

  return <Client path={path} data={data?.data || {}} />;
}

export const dynamic = "force-dynamic";
