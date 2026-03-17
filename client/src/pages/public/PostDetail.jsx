import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPublicPostById } from "../../api/postApi";
import PostContent from "../../components/ui/post/PostContent";

function formatDate(value) {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString();
}

export default function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;

        async function loadPost() {
            try {
                setLoading(true);
                setError("");
                const result = await getPublicPostById(id);
                if (mounted) setPost(result?.data || null);
            } catch (err) {
                if (mounted) setError(err.message || "Failed to load post.");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        loadPost();

        return () => {
            mounted = false;
        };
    }, [id]);

    return (
        <section className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-300"
                    >
                        Back
                    </button>
                    <Link
                        to="/posts"
                        className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800"
                    >
                        All Posts
                    </Link>
                </div>

                {loading ? (
                    <p className="text-sm text-slate-600">Loading post...</p>
                ) : error ? (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                ) : !post ? (
                    <p className="text-sm text-slate-600">Post not found.</p>
                ) : (
                    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        {post.bannerImg ? (
                            <img
                                src={post.bannerImg}
                                alt={post.title || "Post banner"}
                                className="max-h-105 w-full object-cover"
                            />
                        ) : null}

                        <div className="p-6 sm:p-8">
                            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                                <span className="rounded-full bg-sky-100 px-2.5 py-1 font-medium text-sky-700">
                                    {post.category?.name || "General"}
                                </span>
                                <span className="text-slate-500">{formatDate(post.createdAt)}</span>
                            </div>

                            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                                {post.title}
                            </h1>

                            {post.excerpt ? (
                                <p className="mt-4 text-base leading-7 text-slate-700">{post.excerpt}</p>
                            ) : null}

                            <PostContent
                                content={post.content}
                                className="mt-6"
                            />
                        </div>
                    </article>
                )}
            </div>
        </section>
    );
}
