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
                    "prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl m-5 focus:outline-none min-h-[400px] text-gray-300 font-medium",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(JSON.stringify(editor.getJSON()));
        },
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
        <div className="border border-white/5 rounded-xl overflow-hidden bg-[#0a0a0a] shadow-2xl transition-all">
            <div className="bg-white/[0.02] border-b border-white/5 p-3 flex flex-wrap gap-2 sticky top-0 z-10 backdrop-blur-xl">
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        className={`p-2 rounded-lg hover:bg-white/10 transition-all ${editor.isActive("bold") ? "bg-indigo-500/20 text-indigo-400" : "text-gray-500"}`}
                        title="Bold"
                    >
                        <Bold size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        className={`p-2 rounded-lg hover:bg-white/10 transition-all ${editor.isActive("italic") ? "bg-indigo-500/20 text-indigo-400" : "text-gray-500"}`}
                        title="Italic"
                    >
                        <Italic size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        disabled={!editor.can().chain().focus().toggleUnderline().run()}
                        className={`p-2 rounded-lg hover:bg-white/10 transition-all ${editor.isActive("underline") ? "bg-indigo-500/20 text-indigo-400" : "text-gray-500"}`}
                        title="Underline"
                    >
                        <UnderlineIcon size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={!editor.can().chain().focus().toggleStrike().run()}
                        className={`p-2 rounded-lg hover:bg-white/10 transition-all ${editor.isActive("strike") ? "bg-indigo-500/20 text-indigo-400" : "text-gray-500"}`}
                        title="Strikethrough"
                    >
                        <Strikethrough size={18} />
                    </button>
                </div>

                <div className="w-px h-6 bg-white/5 mx-1 self-center" />

                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`p-2 rounded-lg hover:bg-white/10 transition-all ${editor.isActive("bulletList") ? "bg-indigo-500/20 text-indigo-400" : "text-gray-500"}`}
                        title="Bullet List"
                    >
                        <List size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`p-2 rounded-lg hover:bg-white/10 transition-all ${editor.isActive("orderedList") ? "bg-indigo-500/20 text-indigo-400" : "text-gray-500"}`}
                        title="Ordered List"
                    >
                        <ListOrdered size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`p-2 rounded-lg hover:bg-white/10 transition-all ${editor.isActive("blockquote") ? "bg-indigo-500/20 text-indigo-400" : "text-gray-500"}`}
                        title="Blockquote"
                    >
                        <Quote size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={setLink}
                        className={`p-2 rounded-lg hover:bg-white/10 transition-all ${editor.isActive("link") ? "bg-indigo-500/20 text-indigo-400" : "text-gray-500"}`}
                        title="Add Link"
                    >
                        <LinkIcon size={18} />
                    </button>
                </div>

                <div className="w-px h-6 bg-white/5 mx-1 self-center" />

                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().unsetLink().run()}
                        disabled={!editor.isActive('link')}
                        className="p-2 rounded-lg hover:bg-white/10 transition-all text-gray-500 disabled:opacity-30"
                        title="Remove Link"
                    >
                        <Unlink size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={addImage}
                        className="p-2 rounded-lg hover:bg-white/10 transition-all text-gray-500"
                        title="Add Image"
                    >
                        <ImageIcon size={18} />
                    </button>
                </div>

                <div className="w-px h-6 bg-white/5 mx-1 self-center" />

                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().chain().focus().undo().run()}
                        className="p-2 rounded-lg hover:bg-white/10 transition-all text-gray-500 disabled:opacity-30"
                        title="Undo"
                    >
                        <Undo size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().chain().focus().redo().run()}
                        className="p-2 rounded-lg hover:bg-white/10 transition-all text-gray-500 disabled:opacity-30"
                        title="Redo"
                    >
                        <Redo size={18} />
                    </button>
                </div>
            </div>
            <EditorContent editor={editor} className="min-h-[400px] cursor-text" onClick={() => editor.chain().focus().run()} />
        </div>
    );
}
