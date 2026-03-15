import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LogoutButton from "../../../components/admin/LogoutButton";
import PostEditorFields from "../../../components/admin/PostEditorFields";
import PostImageField from "../../../components/admin/PostImageField";
import PostStatusSelect from "../../../components/admin/PostStatusSelect";
import usePostForm from "../../../hooks/usePostForm";
import { getAdminPostById } from "../../../api/postApi";

const categoryOptions = [
  { value: "1", label: "News" },
  { value: "2", label: "Notice" },
];

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [initialData, setInitialData] = useState(null);
  const [loadingPost, setLoadingPost] = useState(isEditMode);
  const [pageError, setPageError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (!isEditMode) {
      setLoadingPost(false);
      return;
    }

    let isMounted = true;

    async function loadPost() {
      try {
        setLoadingPost(true);
        setPageError("");

        const result = await getAdminPostById(id);

        if (isMounted) {
          setInitialData(result?.data || null);
        }
      } catch (error) {
        if (isMounted) {
          setPageError(error.message || "Failed to load post.");
        }
      } finally {
        if (isMounted) {
          setLoadingPost(false);
        }
      }
    }

    loadPost();

    return () => {
      isMounted = false;
    };
  }, [id, isEditMode]);

  const {
    formData,
    errors,
    loading,
    imagePreview,
    handleChange,
    handleImageChange,
    removeImage,
    submit,
  } = usePostForm({
    initialData,
    postId: id,
    onSuccess: (result) => {
      setSubmitMessage(
        isEditMode ? "Post updated successfully." : "Post created successfully."
      );

      const nextId = result?.data?.id;
      if (nextId) {
        navigate(`/admin/posts/${nextId}/edit`, { replace: isEditMode });
      }
    },
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setPageError("");
    setSubmitMessage("");

    try {
      const ok = await submit();
      if (!ok) return;
    } catch (error) {
      setPageError(error.message || "Failed to save post.");
    }
  }

  return (
    <div className="min-h-[calc(100vh-3rem)] rounded-2xl bg-slate-100 shadow-sm">
      <div className="flex items-center justify-between rounded-t-2xl bg-slate-900 px-6 py-4">
        <h1 className="text-lg font-semibold text-white">
          {isEditMode ? "Edit Post" : "Create Post"}
        </h1>
        <LogoutButton />
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700">
                Admin Panel
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                {isEditMode ? "Update Post" : "Post Editor"}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Create and manage announcements with a focused editorial layout.
              </p>
            </div>

            <Link
              to="/admin/posts"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Back to Posts
            </Link>
          </div>

          {pageError ? (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {pageError}
            </div>
          ) : null}

          {submitMessage ? (
            <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {submitMessage}
            </div>
          ) : null}

          {loadingPost ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
              Loading post data...
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <PostEditorFields
                formData={formData}
                errors={errors}
                onChange={handleChange}
                disabled={loading}
              />

              <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900">Publish</h3>

                  <div className="mt-4 space-y-4">
                    <PostStatusSelect
                      value={formData.status}
                      onChange={handleChange}
                      disabled={loading}
                    />

                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-600">
                        Category
                      </label>
                      <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        {categoryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-lg bg-[var(--color-primary)] px-4 py-3 font-medium text-white transition hover:bg-[var(--color-primary-hover)] disabled:opacity-60"
                    >
                      {loading
                        ? "Saving..."
                        : isEditMode
                          ? "Update Post"
                          : "Publish Post"}
                    </button>
                  </div>
                </div>

                <PostImageField
                  previewUrl={imagePreview}
                  onChange={handleImageChange}
                  onRemove={removeImage}
                  disabled={loading}
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
