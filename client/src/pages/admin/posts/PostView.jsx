import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LogoutButton from "../../../components/admin/LogoutButton";
import { deletePost, getAdminPostById } from "../../../api/postApi";

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
}

function LabelValue({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="text-sm text-slate-800">{value || "-"}</p>
    </div>
  );
}

export default function PostView() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [post, setPost] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!location.state?.post);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (post) return;

    let mounted = true;

    async function loadPost() {
      try {
        setLoading(true);
        setError("");
        const result = await getAdminPostById(id);
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
  }, [id, post]);

  async function handleDelete() {
    if (!post?.id) return;

    const confirmed = window.confirm("Delete this post permanently?");
    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");
      await deletePost(post.id);
      navigate("/admin/posts", { replace: true });
    } catch (err) {
      setError(err.message || "Failed to delete post.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-3rem)] rounded-2xl bg-slate-100 shadow-sm">
      <div className="flex items-center justify-between rounded-t-2xl bg-slate-900 px-6 py-4">
        <h1 className="text-lg font-semibold text-white">Post Details</h1>
        <LogoutButton />
      </div>

      <div className="px-6 py-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-300"
          >
            Back
          </button>

          <Link
            to="/admin/posts"
            className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
          >
            Post List
          </Link>

          {post ? (
            <>
              <Link
                to={`/admin/posts/${post.id}/edit`}
                className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
              >
                Edit
              </Link>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </>
          ) : null}
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          {loading ? (
            <p className="text-sm text-slate-600">Loading post details...</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : !post ? (
            <p className="text-sm text-slate-600">No data.</p>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900">
                {post.title || "Untitled Post"}
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <LabelValue label="Post ID" value={String(post.id || "-")} />
                <LabelValue label="Slug" value={post.slug} />
                <LabelValue label="Category" value={post.category?.name || "-"} />
                <LabelValue label="Status" value={post.status} />
                <LabelValue label="Created At" value={formatDate(post.createdAt)} />
                <LabelValue label="Updated At" value={formatDate(post.updatedAt)} />
              </div>

              <LabelValue label="Excerpt" value={post.excerpt} />

              {post.bannerImg ? (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Banner Image
                  </p>
                  <img
                    src={post.bannerImg}
                    alt={post.title || "Post banner"}
                    className="max-h-80 w-full rounded-lg border border-slate-200 object-cover"
                  />
                </div>
              ) : null}

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Content
                </p>
                <div className="whitespace-pre-wrap text-sm leading-7 text-slate-800">
                  {post.content || "-"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
