import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { getPublicPosts } from "../../../../api/postApi";
import useLocalizedCopy from "../../../../hooks/useLocalizedCopy";

const copy = {
  ja: {
    tag: "お知らせ",
    viewAll: "すべてを見る",
    loading: "最新情報を読み込み中...",
    empty: "表示できる最新情報がありません。",
  },
  en: {
    tag: "News",
    viewAll: "View all",
    loading: "Loading latest post...",
    empty: "No latest post available.",
  },
};

function formatDate(value, locale) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString(locale);
}

export default function LatestPost() {
  const t = useLocalizedCopy(copy);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadLatestPost() {
      try {
        setLoading(true);
        setError("");

        const result = await getPublicPosts({ page: 1, limit: 1 });
        const rows = Array.isArray(result?.data) ? result.data : [];

        if (mounted) {
          setPost(rows[0] || null);
        }
      } catch (err) {
        if (mounted) {
          setError(err?.message || "Failed to load latest post.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadLatestPost();

    return () => {
      mounted = false;
    };
  }, []);

  const dateLocale = useMemo(() => {
    return t.viewAll === "View all" ? "en-US" : "ja-JP";
  }, [t.viewAll]);

  return (
    <div className="relative z-10 mx-auto mt-6 hidden w-[90%] flex-col items-center justify-between gap-2 border-t border-neutral-200 bg-white px-4 py-3 text-xs text-(--text-color) md:flex md:flex-row md:px-10 md:text-sm lg:px-16">
      <div className="block min-w-0 flex-1 overflow-x-auto md:flex md:items-center md:gap-3">
        <span className="w-25 text-sm font-bold text-(--color-dark) md:border-r md:border-gray-300 md:text-base">NEWS</span>
        <span className="text-neutral-400">{post ? formatDate(post.createdAt, dateLocale) : "-"}</span>
        <span className="hidden bg-black px-2 py-0.5 text-[8px] text-white xl:block xl:text-xs">{t.tag}</span>

        <p className="ml-2 truncate md:border-l md:border-gray-300 md:pl-4">
          {loading ? (
            <span className="text-[10px] text-(--text-color) lg:text-sm">{t.loading}</span>
          ) : error ? (
            <span className="text-[10px] text-red-600 lg:text-sm">{error}</span>
          ) : post ? (
            <Link
              to={`/posts/${post.id}`}
              className="bg-[linear-gradient(var(--color-primary),var(--color-primary))] bg-[length:0%_1px] bg-[center_bottom] bg-no-repeat text-[10px] text-(--text-color) transition-all duration-300 ease-in-out hover:bg-[length:100%_1px] hover:text-(--color-dark) lg:text-sm"
            >
              {post.title}
            </Link>
          ) : (
            <span className="text-[10px] text-(--text-color) lg:text-sm">{t.empty}</span>
          )}
        </p>
      </div>

      <div className="shrink-0 md:border-l md:border-gray-300 md:pl-4">
        <Link
          to="/posts"
          className="inline-flex items-center gap-1 bg-[linear-gradient(var(--color-primary),var(--color-primary))] bg-[length:0%_1px] bg-[center_bottom] bg-no-repeat text-[10px] text-(--color-primary) transition-all duration-300 ease-in-out hover:bg-[length:100%_1px] hover:text-[#06a4d4] sm:text-xs"
        >
          {t.viewAll} <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
}
