
import dynamic from "next/dynamic";
import React from "react";

/**
 * Theme Engine Registry
 */
export const THEMES = [
  { id: "default", name: "Default Basic" },
  { id: "luxury", name: "Luxury Dark" },
];

/**
 * Dynamically loads the layout for the active theme.
 */
export function getThemeLayout(themeId: string = "default") {
  switch (themeId) {
    case "default":
      return dynamic(() => import("../themes/default/Layout"));
    // Add more themes here
    default:
      return dynamic(() => import("../themes/default/Layout"));
  }
}
