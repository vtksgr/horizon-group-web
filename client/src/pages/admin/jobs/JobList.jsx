import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";
import LogoutButton from "../../../components/admin/LogoutButton";

function toInputDate(value) {
	if (!value) return "";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return year + "-" + month + "-" + day;
}

function formatDate(value) {
	if (!value) return "-";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "-";
	return date.toLocaleDateString();
}

export default function JobList() {
	const [jobs, setJobs] = useState([]);
	const [titleFilter, setTitleFilter] = useState("");
	const [dateFilter, setDateFilter] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let mounted = true;

		async function loadJobs() {
			try {
				setLoading(true);
				setError("");

				const res = await api.get("/api/admin/jobs", {
					params: { page: 1, limit: 100 },
				});

				const rows = Array.isArray(res.data?.data) ? res.data.data : [];
				if (mounted) {
					setJobs(rows);
				}
			} catch (err) {
				if (mounted) {
					setError(err.message || "Failed to load jobs.");
				}
			} finally {
				if (mounted) {
					setLoading(false);
				}
			}
		}

		loadJobs();

		return function cleanup() {
			mounted = false;
		};
	}, []);

	const filteredJobs = useMemo(() => {
		const titleNeedle = titleFilter.trim().toLowerCase();

		return jobs
			.filter((job) => {
				const title = (job.title || "").toLowerCase();
				const titleOk = !titleNeedle || title.includes(titleNeedle);

				const createdDate = toInputDate(job.createdAt);
				const dateOk = !dateFilter || createdDate === dateFilter;

				return titleOk && dateOk;
			})
			.sort((a, b) => {
				const aTime = new Date(a.createdAt || 0).getTime();
				const bTime = new Date(b.createdAt || 0).getTime();
				return bTime - aTime;
			});
	}, [jobs, titleFilter, dateFilter]);

	return (
		<div className="min-h-[calc(100vh-3rem)] rounded-2xl bg-slate-100 shadow-sm">
			<div className="flex items-center justify-between rounded-t-2xl bg-slate-900 px-6 py-4">
				<h1 className="text-lg font-semibold text-white">Job List</h1>
				<LogoutButton />
			</div>

			<div className="px-6 py-6">
				<div className="mb-4 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-end">
					<div className="w-full md:max-w-sm">
						<label className="mb-1 block text-sm font-medium text-slate-700">
							Filter by Job Title
						</label>
						<input
							type="text"
							value={titleFilter}
							onChange={(e) => setTitleFilter(e.target.value)}
							placeholder="Search title..."
							className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
						/>
					</div>

					<div className="w-full md:max-w-xs">
						<label className="mb-1 block text-sm font-medium text-slate-700">
							Filter by Date
						</label>
						<input
							type="date"
							value={dateFilter}
							onChange={(e) => setDateFilter(e.target.value)}
							className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
						/>
					</div>

					<button
						type="button"
						onClick={() => {
							setTitleFilter("");
							setDateFilter("");
						}}
						className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-300"
					>
						Reset
					</button>

					<div className="flex gap-2 md:ml-auto">
						<Link
							to="/admin/dashboard"
							className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
						>
							Back to Dashboard
						</Link>

						<Link
							to="/admin/jobs/new"
							className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
						>
							New Job
						</Link>
					</div>
				</div>

				<div className="overflow-hidden rounded-xl bg-white shadow-sm">
					{loading ? (
						<div className="p-6 text-sm text-slate-600">Loading jobs...</div>
					) : error ? (
						<div className="p-6 text-sm text-red-600">{error}</div>
					) : filteredJobs.length === 0 ? (
						<div className="p-6 text-sm text-slate-600">No jobs found.</div>
					) : (
						<div className="overflow-x-auto">
							<table className="min-w-full border-collapse">
								<thead className="bg-slate-50">
									<tr>
										<th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
											No.
										</th>
										<th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
											Job Title
										</th>
										<th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
											Created Date
										</th>
										<th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									{filteredJobs.map((job, index) => (
										<tr key={job.id} className="hover:bg-slate-50">
											<td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
												{index + 1}
											</td>
											<td className="border-b border-slate-100 px-4 py-3 text-sm font-medium text-slate-900">
												{job.title || "-"}
											</td>
											<td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
												{formatDate(job.createdAt)}
											</td>
											<td className="border-b border-slate-100 px-4 py-3 text-sm">
												<Link
													to={"/admin/jobs/" + job.id}
													state={{ job: job }}
													className="rounded-md bg-cyan-600 px-3 py-1.5 text-white hover:bg-cyan-700"
												>
													Open Details
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
