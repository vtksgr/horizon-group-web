import { useRef } from "react";

const toolbarButtons = [
    { label: "B", title: "Bold", before: "**", after: "**", placeholder: "bold text" },
    { label: "I", title: "Italic", before: "*", after: "*", placeholder: "italic text" },
    { label: "Link", title: "Link", before: "[", after: "](https://example.com)", placeholder: "link text" },
    { label: "H2", title: "Heading", before: "## ", after: "", placeholder: "Heading" },
    { label: "B-Quote", title: "Blockquote", before: "> ", after: "", placeholder: "quoted text" },
    { label: "Del", title: "Strikethrough", before: "~~", after: "~~", placeholder: "deleted text" },
    { label: "Ins", title: "Inserted text", before: "<ins>", after: "</ins>", placeholder: "inserted text" },
    { label: "Img", title: "Image", before: "![", after: "](https://example.com/image.jpg)", placeholder: "alt text" },
    { label: "Ul", title: "Unordered list", before: "- ", after: "", placeholder: "list item" },
    { label: "Ol", title: "Ordered list", before: "1. ", after: "", placeholder: "list item" },
    { label: "Li", title: "List item", before: "- ", after: "", placeholder: "list item" },
];

export default function PostEditorFields({
    formData,
    errors,
    onChange,
    disabled = false,
}) {
    const contentRef = useRef(null);

    function updateContent(nextValue, selectionStart, selectionEnd) {
        onChange({
            target: {
                name: "content",
                value: nextValue,
            },
        });

        requestAnimationFrame(() => {
            if (!contentRef.current) return;
            contentRef.current.focus();
            contentRef.current.setSelectionRange(selectionStart, selectionEnd);
        });
    }

    function applyFormat(button) {
        if (disabled || !contentRef.current) return;

        const textarea = contentRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = formData.content.slice(start, end) || button.placeholder;
        const nextValue = [
            formData.content.slice(0, start),
            button.before,
            selectedText,
            button.after,
            formData.content.slice(end),
        ].join("");

        const nextSelectionStart = start + button.before.length;
        const nextSelectionEnd = nextSelectionStart + selectedText.length;

        updateContent(nextValue, nextSelectionStart, nextSelectionEnd);
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
                        {toolbarButtons.map((button) => (
                            <button
                                key={button.label}
                                type="button"
                                onClick={() => applyFormat(button)}
                                disabled={disabled}
                                title={button.title}
                                className="rounded-md border border-sky-300 bg-white px-3 py-1.5 text-xs font-medium text-sky-700 transition hover:border-sky-400 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>

                    <textarea
                        ref={contentRef}
                        name="content"
                        value={formData.content}
                        onChange={onChange}
                        disabled={disabled}
                        rows={18}
                        placeholder="Write your post content here..."
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 leading-7 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    {errors.content ? <p className="mt-1 text-sm text-red-600">{errors.content}</p> : null}
                </div>
            </div>
        </div>
    );
}
