"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link as LinkIcon,
    Image as ImageIcon,
    Unlink,
} from "lucide-react";

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
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
        content: (() => {
            try {
                return content ? JSON.parse(content) : "";
            } catch (e) {
                return content; // Fallback to plain HTML/Text if invalid JSON
            }
        })(),
        editorProps: {
            attributes: {
                class:
                    "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[300px]",
            },
        },
        onUpdate: ({ editor }) => {
            // We'll save as JSON string to maintain structure if possible, or HTML if preferred.
            // The original PostEditor implementation used JSON.stringify(initialData?.content)
            // Let's return the JSON object as a string to match that expectation
            onChange(JSON.stringify(editor.getJSON()));
        },
        // Fix for hydration mismatch if needed, but 'content' prop usually handles it.
        immediatelyRender: false,
    });

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        // update
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    const addImage = () => {
        const url = window.prompt('Image URL');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive("bold") ? "bg-gray-200 text-black" : "text-gray-600"}`}
                        title="Bold"
                    >
                        <Bold size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive("italic") ? "bg-gray-200 text-black" : "text-gray-600"}`}
                        title="Italic"
                    >
                        <Italic size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        disabled={!editor.can().chain().focus().toggleUnderline().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive("underline") ? "bg-gray-200 text-black" : "text-gray-600"}`}
                        title="Underline"
                    >
                        <UnderlineIcon size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={!editor.can().chain().focus().toggleStrike().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive("strike") ? "bg-gray-200 text-black" : "text-gray-600"}`}
                        title="Strikethrough"
                    >
                        <Strikethrough size={18} />
                    </button>
                </div>

                <div className="w-px h-6 bg-gray-300 mx-2 self-center" />

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive("bulletList") ? "bg-gray-200 text-black" : "text-gray-600"}`}
                        title="Bullet List"
                    >
                        <List size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive("orderedList") ? "bg-gray-200 text-black" : "text-gray-600"}`}
                        title="Ordered List"
                    >
                        <ListOrdered size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive("blockquote") ? "bg-gray-200 text-black" : "text-gray-600"}`}
                        title="Blockquote"
                    >
                        <Quote size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={setLink}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive("link") ? "bg-gray-200 text-black" : "text-gray-600"}`}
                        title="Add Link"
                    >
                        <LinkIcon size={18} />
                    </button>
                </div>

                <div className="w-px h-6 bg-gray-300 mx-2 self-center" />

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().unsetLink().run()}
                        disabled={!editor.isActive('link')}
                        className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-50"
                        title="Remove Link"
                    >
                        <Unlink size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={addImage}
                        className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600"
                        title="Add Image"
                    >
                        <ImageIcon size={18} />
                    </button>
                </div>

                <div className="w-px h-6 bg-gray-300 mx-2 self-center" />

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().chain().focus().undo().run()}
                        className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-50"
                        title="Undo"
                    >
                        <Undo size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().chain().focus().redo().run()}
                        className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-50"
                        title="Redo"
                    >
                        <Redo size={18} />
                    </button>
                </div>
            </div>
            <EditorContent editor={editor} className="min-h-[300px] cursor-text" onClick={() => editor.chain().focus().run()} />
        </div>
    );
}
