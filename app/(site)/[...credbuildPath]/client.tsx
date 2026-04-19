"use client";

import type { Data } from "@credbuild/core";
import { Render } from "@credbuild/core";
import config from "../../../credbuild.config";

export function Client({ data }: { data: Data }) {
  return <Render config={config} data={data} />;
}
