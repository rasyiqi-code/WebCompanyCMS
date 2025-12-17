"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { useEffect, useState } from "react";

interface TiptapRendererProps {
    content: string;
}

export default function TiptapRenderer({ content }: TiptapRendererProps) {
    const [parsedContent, setParsedContent] = useState<any>(null);

    useEffect(() => {
        try {
            // Check if content is JSON string
            const json = JSON.parse(content);
            setParsedContent(json);
        } catch (e) {
            // Fallback to plain HTML/string
            setParsedContent(content);
        }
    }, [content]);

    const editor = useEditor({
        editable: false,
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: true,
                HTMLAttributes: {
                    class: 'text-blue-500 underline',
                }
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full my-4',
                }
            }),
        ],
        content: parsedContent,
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none",
            },
        },
        immediatelyRender: false,
    }, [parsedContent]);

    if (!editor || parsedContent === null) {
        return null;
    }

    // If it's a string (legacy HTML) and not JSON, we can render it directly to avoid editor overhead 
    // or just let editor handle it if it supports string content (it does).
    // However, recreating editor on content change might be heavy. 
    // For a clearer approach:

    return <EditorContent editor={editor} />;
}
