import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../../../components/admin/LogoutButton";
import { deletePost, getAdminPosts } from "../../../api/postApi";

function formatDate(value) {
    if (!value) return "-";

    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(new Date(value));
}

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busyId, setBusyId] = useState(null);
    const [error, setError] = useState("");

    async function loadPosts() {
        try {
            setLoading(true);
            setError("");
            const result = await getAdminPosts({ page: 1, limit: 100 });
            setPosts(Array.isArray(result?.data) ? result.data : []);
        } catch (err) {
            setError(err.message || "Failed to load posts.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPosts();
    }, []);

    async function handleDelete(id) {
        const confirmed = window.confirm("Delete this post?");
        if (!confirmed) return;

        try {
            setBusyId(id);
            setError("");
            await deletePost(id);
            setPosts((prev) => prev.filter((post) => post.id !== id));
        } catch (err) {
            setError(err.message || "Failed to delete post.");
        } finally {
            setBusyId(null);
        }
    }

    return (
        <div className="min-h-[calc(100vh-3rem)] rounded-2xl bg-slate-100 shadow-sm">
            <div className="flex items-center justify-between rounded-t-2xl bg-slate-900 px-6 py-4">
                <h1 className="text-lg font-semibold text-white">Posts</h1>
                <LogoutButton />
            </div>

            <div className="px-6 py-10">
                <div className="mx-auto w-full max-w-6xl rounded-2xl bg-white p-8 shadow-lg">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700">
                                Admin Panel
                            </p>
                            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                                Post Management
                            </h2>
                            <p className="mt-2 text-sm text-slate-600">
                                Create, review, and manage posts and announcements.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/admin/dashboard"
                                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Back to Dashboard
                            </Link>

                            <Link
                                to="/admin/posts/new"
                                className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
                            >
                                Create Post
                            </Link>
                        </div>
                    </div>

                    {error ? (
                        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    ) : null}

                    {loading ? (
                        <p className="mt-8 text-sm text-slate-600">Loading posts...</p>
                    ) : posts.length === 0 ? (
                        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                            <p className="text-base font-medium text-slate-700">No posts yet</p>
                            <p className="mt-2 text-sm text-slate-500">
                                Create your first post to get started.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Title
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Category
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Created
                                            </th>
                                            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-200 bg-white">
                                        {posts.map((post) => (
                                            <tr key={post.id} className="align-top">
                                                <td className="px-4 py-4">
                                                    <p className="font-medium text-slate-900">{post.title}</p>
                                                    <p className="mt-1 text-xs text-slate-500">/{post.slug}</p>
                                                </td>

                                                <td className="px-4 py-4 text-sm text-slate-700">
                                                    {post.category?.name || "-"}
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span
                                                        className={[
                                                            "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                                                            post.status === "PUBLISHED"
                                                                ? "bg-emerald-100 text-emerald-700"
                                                                : "bg-amber-100 text-amber-700",
                                                        ].join(" ")}
                                                    >
                                                        {post.status}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 text-sm text-slate-700">
                                                    {formatDate(post.createdAt)}
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="flex justify-end gap-3 text-sm">
                                                        <Link
                                                            to={`/admin/posts/${post.id}`}
                                                            className="font-medium text-slate-600 transition hover:text-slate-900"
                                                        >
                                                            View
                                                        </Link>

                                                        <Link
                                                            to={`/admin/posts/${post.id}/edit`}
                                                            className="font-medium text-sky-700 transition hover:text-sky-900"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(post.id)}
                                                            disabled={busyId === post.id}
                                                            className="font-medium text-red-600 transition hover:text-red-700 disabled:opacity-60"
                                                        >
                                                            {busyId === post.id ? "Deleting..." : "Delete"}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
