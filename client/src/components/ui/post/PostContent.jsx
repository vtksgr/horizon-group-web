import DOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

function looksLikeHtml(value) {
    return /<\/?[a-z][\s\S]*>/i.test(String(value || ""));
}

export default function PostContent({ content, className = "" }) {
    const safeContent = DOMPurify.sanitize(String(content || ""), {
        USE_PROFILES: { html: true },
    });

    if (looksLikeHtml(content)) {
        return (
            <div
                className={["post-rich-content", className].filter(Boolean).join(" ")}
                dangerouslySetInnerHTML={{ __html: safeContent || "<p>-</p>" }}
            />
        );
    }

    return (
        <div className={["post-rich-content", className].filter(Boolean).join(" ")}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: (props) => <h1 className="mt-8 text-3xl font-semibold text-slate-900 first:mt-0" {...props} />,
                    h2: (props) => <h2 className="mt-8 text-2xl font-semibold text-slate-900 first:mt-0" {...props} />,
                    h3: (props) => <h3 className="mt-6 text-xl font-semibold text-slate-900 first:mt-0" {...props} />,
                    h4: (props) => <h4 className="mt-6 text-lg font-semibold text-slate-900 first:mt-0" {...props} />,
                    p: (props) => <p className="mt-4 text-sm leading-7 text-slate-800 first:mt-0" {...props} />,
                    a: (props) => <a className="font-medium text-sky-700 underline underline-offset-2" target="_blank" rel="noreferrer" {...props} />,
                    blockquote: (props) => <blockquote className="mt-6 border-l-4 border-sky-200 bg-sky-50 px-4 py-3 text-slate-700" {...props} />,
                    ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-7 text-slate-800" {...props} />,
                    ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm leading-7 text-slate-800" {...props} />,
                    li: (props) => <li className="pl-1" {...props} />,
                    img: (props) => <img className="mt-6 max-h-105 w-full rounded-xl border border-slate-200 object-cover" {...props} />,
                    del: (props) => <del className="text-slate-500" {...props} />,
                    ins: (props) => <ins className="decoration-sky-500 decoration-2 underline-offset-4" {...props} />,
                }}
            >
                {content || "-"}
            </ReactMarkdown>
        </div>
    );
}