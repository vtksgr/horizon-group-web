export default function PostImageField({
    previewUrl,
    onChange,
    onRemove,
    disabled = false,
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Featured Image</h3>
            <p className="mt-1 text-sm text-slate-500">
                Optional. You can publish this post without uploading an image.
            </p>

            <div className="mt-4">
                {previewUrl ? (
                    <div className="overflow-hidden rounded-lg border border-slate-200">
                        <img
                            src={previewUrl}
                            alt="Post banner preview"
                            className="h-48 w-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
                        No image selected
                    </div>
                )}
            </div>

            <div className="mt-4 space-y-3">
                <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={onChange}
                    disabled={disabled}
                    className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-sky-100 file:px-3 file:py-2 file:font-medium file:text-sky-800 hover:file:bg-sky-200"
                />

                {previewUrl ? (
                    <button
                        type="button"
                        onClick={onRemove}
                        className="text-sm font-medium text-red-600 transition hover:text-red-700"
                    >
                        Remove image
                    </button>
                ) : null}
            </div>
        </div>
    );
}
