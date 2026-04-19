import React from "react";
import type { ComponentConfig } from "@credbuild/core";

export type RichTextProps = {
  content: string;
  maxWidth?: string;
  paddingTop?: number;
  paddingBottom?: number;
};

export const RichText: ComponentConfig<RichTextProps> = {
  label: "Rich Text",
  fields: {
    content: {
      type: "textarea",
      label: "HTML Content",
    },
    maxWidth: {
      type: "select",
      label: "Max Width",
      options: [
        { label: "Prose (Standard)", value: "max-w-prose" },
        { label: "Medium", value: "max-w-4xl" },
        { label: "Large", value: "max-w-6xl" },
        { label: "Full", value: "max-w-full" },
      ],
    },
    paddingTop: { type: "number", label: "Padding Top" },
    paddingBottom: { type: "number", label: "Padding Bottom" },
  },
  defaultProps: {
    content: "<p>Start typing your content here...</p>",
    maxWidth: "max-w-prose",
    paddingTop: 64,
    paddingBottom: 64,
  },
  render: ({ content, maxWidth, paddingTop, paddingBottom }) => {
    return (
      <div 
        className="w-full bg-[#111111]"
        style={{ paddingTop, paddingBottom }}
      >
        <div 
          className={`mx-auto px-6 prose prose-invert ${maxWidth} prose-p:text-gray-400 prose-headings:text-white prose-strong:text-white prose-a:text-[#2eaadc]`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  },
};
