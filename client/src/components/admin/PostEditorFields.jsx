import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

const toolbarButtons = [
    { label: "B", title: "Bold", command: "bold" },
    { label: "I", title: "Italic", command: "italic" },
    { label: "Link", title: "Link", command: "link" },
    { label: "B-Quote", title: "Blockquote", command: "blockquote" },
    { label: "Del", title: "Strikethrough", command: "strike" },
    { label: "Ins", title: "Underline", command: "underline" },
    { label: "Ul", title: "Unordered list", command: "bulletList" },
    { label: "Ol", title: "Ordered list", command: "orderedList" },
    { label: "Li", title: "Paragraph", command: "paragraph" },
];

const headingOptions = [
    { label: "Paragraph", value: "paragraph" },
    { label: "H2", value: "2" },
    { label: "H3", value: "3" },
    { label: "H4", value: "4" },
];

function normalizeEditorValue(value) {
    const normalized = String(value || "").trim();

    if (
        !normalized ||
        normalized === "<p></p>" ||
        normalized === "<p><br></p>"
    ) {
        return "";
    }

    return normalized;
}

export default function PostEditorFields({
    formData,
    errors,
    onChange,
    disabled = false,
}) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3, 4],
                },
            }),
            Link.configure({
                autolink: true,
                openOnClick: false,
                defaultProtocol: "https",
            }),
            Underline,
            Placeholder.configure({
                placeholder: "Write your post content here...",
            }),
        ],
        content: normalizeEditorValue(formData.content),
        editorProps: {
            attributes: {
                class: "post-editor-content min-h-[420px] px-4 py-3 focus:outline-none",
            },
        },
        onUpdate: ({ editor: nextEditor }) => {
            onChange({
                target: {
                    name: "content",
                    value: normalizeEditorValue(nextEditor.getHTML()),
                },
            });
        },
    });

    useEffect(() => {
        if (!editor) return;
        editor.setEditable(!disabled);
    }, [disabled, editor]);

    useEffect(() => {
        if (!editor) return;

        const currentValue = normalizeEditorValue(editor.getHTML());
        const nextValue = normalizeEditorValue(formData.content);

        if (currentValue !== nextValue) {
            editor.commands.setContent(nextValue || "", false);
        }
    }, [editor, formData.content]);

    function applyFormat(command) {
        if (disabled || !editor) return;

        if (command === "link") {
            const currentUrl = editor.getAttributes("link").href || "https://";
            const url = window.prompt("Enter link URL", currentUrl);

            if (url === null) return;

            const trimmedUrl = url.trim();
            if (!trimmedUrl) {
                editor.chain().focus().extendMarkRange("link").unsetLink().run();
                return;
            }

            editor.chain().focus().extendMarkRange("link").setLink({ href: trimmedUrl }).run();
            return;
        }

        const chain = editor.chain().focus();

        switch (command) {
            case "bold":
                chain.toggleBold().run();
                break;
            case "italic":
                chain.toggleItalic().run();
                break;
            case "blockquote":
                chain.toggleBlockquote().run();
                break;
            case "strike":
                chain.toggleStrike().run();
                break;
            case "underline":
                chain.toggleUnderline().run();
                break;
            case "bulletList":
                chain.toggleBulletList().run();
                break;
            case "orderedList":
                chain.toggleOrderedList().run();
                break;
            case "paragraph":
                chain.setParagraph().run();
                break;
            default:
                break;
        }
    }

    function handleHeadingChange(event) {
        if (disabled || !editor) return;

        const value = event.target.value;
        const chain = editor.chain().focus();

        if (value === "paragraph") {
            chain.setParagraph().run();
            return;
        }

        chain.setHeading({ level: Number(value) }).run();
    }

    function getActiveHeadingValue() {
        if (!editor) return "paragraph";
        if (editor.isActive("heading", { level: 2 })) return "2";
        if (editor.isActive("heading", { level: 3 })) return "3";
        if (editor.isActive("heading", { level: 4 })) return "4";
        return "paragraph";
    }

    function isActive(command) {
        if (!editor) return false;

        switch (command) {
            case "bold":
                return editor.isActive("bold");
            case "italic":
                return editor.isActive("italic");
            case "link":
                return editor.isActive("link");
            case "blockquote":
                return editor.isActive("blockquote");
            case "strike":
                return editor.isActive("strike");
            case "underline":
                return editor.isActive("underline");
            case "bulletList":
                return editor.isActive("bulletList");
            case "orderedList":
                return editor.isActive("orderedList");
            case "paragraph":
                return editor.isActive("paragraph");
            default:
                return false;
        }
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-6">
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-600">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={onChange}
                        disabled={disabled}
                        placeholder="Enter post title"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    {errors.title ? <p className="mt-1 text-sm text-red-600">{errors.title}</p> : null}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-600">
                        Slug
                    </label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={onChange}
                        disabled={disabled}
                        placeholder="post-url-slug"
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    {errors.slug ? <p className="mt-1 text-sm text-red-600">{errors.slug}</p> : null}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-600">
                        Excerpt
                    </label>
                    <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={onChange}
                        disabled={disabled}
                        rows={4}
                        placeholder="Short summary for cards and previews"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-600">
                        Content
                    </label>

                    <div className="mb-3 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <select
                            value={getActiveHeadingValue()}
                            onChange={handleHeadingChange}
                            disabled={disabled || !editor}
                            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {headingOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        {toolbarButtons.map((button) => (
                            <button
                                key={button.label}
                                type="button"
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => applyFormat(button.command)}
                                disabled={disabled || !editor}
                                title={button.title}
                                className={[
                                    "rounded-md border px-3 py-1.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
                                    isActive(button.command)
                                        ? "border-sky-600 bg-sky-600 text-white"
                                        : "border-sky-300 bg-white text-sky-700 hover:border-sky-400 hover:bg-sky-50",
                                ].join(" ")}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-300 bg-white focus-within:ring-2 focus-within:ring-cyan-500">
                        <EditorContent editor={editor} />
                    </div>
                    {errors.content ? <p className="mt-1 text-sm text-red-600">{errors.content}</p> : null}
                </div>
            </div>
        </div>
    );
}
