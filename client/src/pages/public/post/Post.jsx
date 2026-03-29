import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/ui/breadcrumbs/Breadcrumbs";
import { getPublicPosts } from "../../../api/postApi";

const PAGE_SIZE = 10;

function formatDate(value) {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
}

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const breadcrumbsItem = [
        { label: "ホーム", to: "/" },
        { label: "お知らせ", to: "/posts" },
    ];

    function goToPage(nextPage) {
        const clamped = Math.min(Math.max(nextPage, 1), totalPages);
        setPage(clamped);
    }

    const visiblePages = useMemo(() => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, idx) => idx + 1);
        }

        const start = Math.max(1, page - 2);
        const end = Math.min(totalPages, page + 2);
        const pages = new Set([1, totalPages]);

        for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
            pages.add(pageNumber);
        }

        return Array.from(pages).sort((left, right) => left - right);
    }, [page, totalPages]);

    useEffect(() => {
        let mounted = true;

        async function loadPosts() {
            try {
                setLoading(true);
                setError("");
                const result = await getPublicPosts({ page, limit: PAGE_SIZE });
                const rows = Array.isArray(result?.data) ? result.data : [];
                const apiTotalPages = Number(result?.pagination?.totalPages);

                if (mounted) {
                    setPosts(rows);
                    setTotalPages(Math.max(1, Number.isFinite(apiTotalPages) ? apiTotalPages : 1));
                }
            } catch (err) {
                if (mounted) setError(err.message || "Failed to load posts.");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        loadPosts();

        return () => {
            mounted = false;
        };
    }, [page]);

    return (
        <>
        {/* Page title */}
            <section className="w-full mt-32 border-b border-(--color-border)">
                <div className="lg:w-[75%] mx-auto px-7 lg:px-0 pb-9 page_title">
                    <h1 className="font-semibold">INFORMATION</h1>
                    <h6 className="font-semibold text-(--color-text-secondary)">新着情報</h6>
                </div>
            </section>
            {/* breadcrumbs */}
            <section>
                <div className="lg:w-[75%] mx-auto px-7 lg:px-0">
                    <Breadcrumbs items={breadcrumbsItem} />
                </div>
            </section>
            {/* body */}
            <section className="my-32 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    {loading ? (
                        <p className="text-sm text-(--color-text-secondary)">Loading posts...</p>
                    ) : error ? (
                        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="rounded-xl border border-(--color-border) bg-(--color-background) px-6 py-12 text-center shadow-sm">
                            <p className="text-base font-medium text-(--color-text-secondary)">No posts available</p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-7">
                                {posts.map((post) => (
                                    <article
                                        key={post.id}
                                        className="rounded-xl border border-[#dde3e8] bg-[#eaf1f5] p-5 shadow-[0_1px_0_rgba(11,19,34,0.04)]"
                                    >
                                        <div className="grid items-start gap-5 md:grid-cols-[180px_1fr_auto] md:items-center lg:grid-cols-[220px_1fr_auto]">
                                            <div className="h-30 overflow-hidden rounded-lg bg-[#c9cbcf] md:h-32.5">
                                                {post.bannerImg ? (
                                                    <img
                                                        src={post.bannerImg}
                                                        alt={post.title || "Post banner"}
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                ) : null}
                                            </div>

                                            <div className="min-w-0">
                                                <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
                                                    <span className="text-[#94a3b8]">{formatDate(post.createdAt)}</span>
                                                    <span className="inline-flex items-center bg-(--color-dark) px-3 py-1 text-xs font-bold tracking-wide text-white">
                                                        {post?.category?.name || "News"}
                                                    </span>
                                                </div>

                                                <h2 className="line-clamp-2 text-[28px] font-bold leading-tight text-(--color-dark) md:text-[30px]">
                                                    {post.title}
                                                </h2>

                                                <p className="mt-4 line-clamp-2 text-base leading-relaxed text-(--color-text-secondary)">
                                                    {post.excerpt || "Read more in the full article."}
                                                </p>
                                            </div>

                                            <div className="flex justify-end md:self-center">
                                                <Link
                                                    to={`/posts/${post.id}`}
                                                    aria-label={`Open ${post.title || "post"}`}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-primary) text-white transition hover:bg-(--color-primary-hover)"
                                                >
                                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                                                        <path
                                                            d="M8 12h8m0 0-3-3m3 3-3 3"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {totalPages > 1 ? (
                                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => goToPage(page - 1)}
                                        disabled={page === 1}
                                        className="rounded-md border border-(--color-border) bg-(--color-background) px-3 py-1.5 text-sm text-(--color-dark) disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Previous
                                    </button>

                                    {visiblePages.map((pageNumber, index) => {
                                        const previousPage = visiblePages[index - 1];
                                        const shouldShowGap = previousPage && pageNumber - previousPage > 1;

                                        return (
                                            <div key={pageNumber} className="contents">
                                                {shouldShowGap ? (
                                                    <span className="px-1 text-sm text-(--color-text-secondary)" aria-hidden="true">
                                                        ...
                                                    </span>
                                                ) : null}

                                                <button
                                                    type="button"
                                                    onClick={() => goToPage(pageNumber)}
                                                    className={[
                                                        "rounded-md border px-3 py-1.5 text-sm",
                                                        pageNumber === page
                                                            ? "border-(--color-primary) bg-(--color-primary) text-white"
                                                            : "border-(--color-border) bg-(--color-background) text-(--color-dark)",
                                                    ].join(" ")}
                                                >
                                                    {pageNumber}
                                                </button>
                                            </div>
                                        );
                                    })}

                                    <button
                                        type="button"
                                        onClick={() => goToPage(page + 1)}
                                        disabled={page === totalPages}
                                        className="rounded-md border border-(--color-border) bg-(--color-background) px-3 py-1.5 text-sm text-(--color-dark) disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
