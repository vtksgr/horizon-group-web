import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../api/axios";
import LogoutButton from "../../../components/admin/LogoutButton";

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

export default function JobView() {
	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	const [job, setJob] = useState(location.state?.job || null);
	const [loading, setLoading] = useState(!location.state?.job);
	const [deleting, setDeleting] = useState(false);
	const [error, setError] = useState("");

	async function handleDelete() {
		if (!job?.id) return;
		const confirmed = window.confirm("Delete this job permanently?");
		if (!confirmed) return;

		try {
			setDeleting(true);
			setError("");
			await api.delete("/api/admin/jobs/" + job.id);
			navigate("/admin/jobs", { replace: true });
		} catch (err) {
			setError(err.message || "Failed to delete job.");
		} finally {
			setDeleting(false);
		}
	}

	useEffect(() => {
		if (job) return;

		let mounted = true;

		async function loadSingleJob() {
			try {
				setLoading(true);
				setError("");

				const res = await api.get("/api/admin/jobs", {
					params: { page: 1, limit: 100 },
				});

				const rows = Array.isArray(res.data?.data) ? res.data.data : [];
				const found = rows.find((item) => String(item.id) === String(id));

				if (!found) {
					throw new Error("Job not found.");
				}

				if (mounted) {
					setJob(found);
				}
			} catch (err) {
				if (mounted) {
					setError(err.message || "Failed to load job details.");
				}
			} finally {
				if (mounted) {
					setLoading(false);
				}
			}
		}

		loadSingleJob();

		return function cleanup() {
			mounted = false;
		};
	}, [id, job]);

	return (
		<div className="min-h-[calc(100vh-3rem)] rounded-2xl bg-slate-100 shadow-sm">
			<div className="flex items-center justify-between rounded-t-2xl bg-slate-900 px-6 py-4">
				<h1 className="text-lg font-semibold text-white">Job Details</h1>
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
						to="/admin/jobs"
						className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
					>
						Job List
					</Link>

					{job ? (
						<>
							<Link
								to={"/admin/jobs/" + job.id + "/edit"}
								state={{ job }}
								className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
							>
								Update
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
						<p className="text-sm text-slate-600">Loading job details...</p>
					) : error ? (
						<p className="text-sm text-red-600">{error}</p>
					) : !job ? (
						<p className="text-sm text-slate-600">No data.</p>
					) : (
						<div className="space-y-4">
							<h2 className="text-2xl font-semibold text-slate-900">
								{job.title || "Untitled Job"}
							</h2>

							<div className="grid gap-4 md:grid-cols-2">
								<LabelValue label="Job ID" value={String(job.id || "-")} />
								<LabelValue label="Slug" value={job.slug} />
								<LabelValue label="Company Name" value={job.companyName} />
								<LabelValue label="Employment Type" value={job.employmentType} />
								<LabelValue label="Status" value={job.status} />
								<LabelValue label="Active" value={job.isActive ? "Yes" : "No"} />
								<LabelValue label="Salary" value={job.salary} />
								<LabelValue label="Location" value={job.location} />
								<LabelValue label="Created At" value={formatDate(job.createdAt)} />
								<LabelValue label="Updated At" value={formatDate(job.updatedAt)} />
							</div>

							<LabelValue label="Description" value={job.description} />
							<LabelValue label="Skills Required" value={job.skillsRequired} />
							<LabelValue label="Work Hours" value={job.workHours} />
							<LabelValue label="Holidays" value={job.holidays} />
							<LabelValue label="Interview Details" value={job.interviewDetails} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
