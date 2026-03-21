export default function PostStatusSelect({ value, onChange, disabled = false }) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
                Status
            </label>
            <select
                name="status"
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
            </select>
        </div>
    );
}
