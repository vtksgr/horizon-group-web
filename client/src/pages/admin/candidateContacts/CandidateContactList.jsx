import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";
import LogoutButton from "../../../components/admin/LogoutButton";

const CONTACT_QUERY = {
	type: "candidate",
	page: 1,
	limit: 100,
	sort: "newest",
};

function toInputDate(value) {
	if (!value) return "";

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

function formatDate(value) {
	if (!value) return "-";

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "-";

	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(date);
}

function formatInquiryType(value) {
	if (!value) return "-";

	const inquiryTypeMap = {
		INTERVIEWS_CONSULTATIONS: "面接・相談",
		RECRUITMENT: "人材紹介",
		ONLINE_CLASSES: "オンライン授業",
		SEMINAR_PARTICIPATION: "セミナー参加",
		JOB_HUNTING_SUPPORT: "就職支援",
		CAREER_CHANGE_SUPPORT: "転職支援",
		OTHER_SUPPORT: "その他サポート",
	};

	if (inquiryTypeMap[value]) {
		return inquiryTypeMap[value];
	}

	return String(value)
		.toLowerCase()
		.split("_")
		.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
		.join(" ");
}

function getContactName(contact) {
	return [contact.firstName, contact.lastName].filter(Boolean).join(" ") || "-";
}

function sortByNewest(left, right) {
	const leftTime = new Date(left.createdAt || 0).getTime();
	const rightTime = new Date(right.createdAt || 0).getTime();
	return rightTime - leftTime;
}

function getFileNameFromDisposition(value, fallbackName) {
	if (!value) return fallbackName;

	const utf8Match = value.match(/filename\*=UTF-8''([^;]+)/i);
	if (utf8Match?.[1]) {
		try {
			return decodeURIComponent(utf8Match[1]);
		} catch {
			return utf8Match[1];
		}
	}

	const simpleMatch = value.match(/filename="?([^";]+)"?/i);
	return simpleMatch?.[1] || fallbackName;
}

function triggerBlobDownload(blob, fileName) {
	const blobUrl = window.URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = blobUrl;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	link.remove();
	window.URL.revokeObjectURL(blobUrl);
}

export default function CandidateContactList() {
	const [contacts, setContacts] = useState([]);
	const [searchFilter, setSearchFilter] = useState("");
	const [dateFilter, setDateFilter] = useState("");
	const [loading, setLoading] = useState(true);
	const [downloadingId, setDownloadingId] = useState(null);
	const [deletingId, setDeletingId] = useState(null);
	const [error, setError] = useState("");

	async function handleResumeDownload(contactId) {
		const fallbackName = `resume-${contactId}.pdf`;

		try {
			setDownloadingId(contactId);
			const response = await api.get(`/api/admin/contacts/${contactId}/resume`, {
				responseType: "blob",
			});

			const contentDisposition = response.headers?.["content-disposition"];
			const fileName = getFileNameFromDisposition(contentDisposition, fallbackName);
			triggerBlobDownload(response.data, fileName);
		} catch (err) {
			setError(err?.message || "履歴書のダウンロードに失敗しました。サーバー設定を確認してください。");
		} finally {
			setDownloadingId(null);
		}
	}

	async function handleDeleteContact(contactId) {
		const input = window.prompt("削除する場合は「削除」と入力してください。キャンセルで中止します。", "");
		if (input === null) return;

		if (String(input).trim() !== "削除") {
			setError("削除を実行するには「削除」と入力してください。");
			return;
		}

		try {
			setDeletingId(contactId);
			setError("");
			await api.delete(`/api/admin/contacts/${contactId}`);
			setContacts((prev) => prev.filter((item) => item.id !== contactId));
		} catch (err) {
			setError(err?.message || "お問い合わせの削除に失敗しました。");
		} finally {
			setDeletingId(null);
		}
	}

	useEffect(() => {
		let mounted = true;

		async function loadContacts() {
			try {
				setLoading(true);
				setError("");

				const response = await api.get("/api/admin/contacts", {
					params: CONTACT_QUERY,
				});

				const rows = Array.isArray(response.data?.data) ? response.data.data : [];
				if (mounted) setContacts(rows);
			} catch (err) {
				if (mounted) {
					setError(err?.message || "求職者お問い合わせの読み込みに失敗しました。");
				}
			} finally {
				if (mounted) setLoading(false);
			}
		}

		loadContacts();

		return function cleanup() {
			mounted = false;
		};
	}, []);

	const filteredContacts = useMemo(() => {
		const needle = searchFilter.trim().toLowerCase();

		return contacts
			.filter((contact) => {
				const fullName = getContactName(contact).toLowerCase();
				const email = String(contact.email || "").toLowerCase();
				const phoneNumber = String(contact.phoneNumber || "").toLowerCase();

				const matchesSearch =
					!needle ||
					fullName.includes(needle) ||
					email.includes(needle) ||
					phoneNumber.includes(needle);

				const matchesDate = !dateFilter || toInputDate(contact.createdAt) === dateFilter;

				return matchesSearch && matchesDate;
			})
			.sort(sortByNewest);
	}, [contacts, dateFilter, searchFilter]);

	return (
		<div className="min-h-[calc(100vh-3rem)] rounded-2xl bg-slate-100 shadow-sm">
			<div className="flex items-center justify-between rounded-t-2xl bg-slate-900 px-6 py-4">
				<h1 className="text-lg font-semibold text-white">求職者お問い合わせ一覧</h1>
				<LogoutButton />
			</div>

			<div className="px-6 py-6">
				<div className="mb-4 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-end">
					<div className="w-full md:max-w-sm">
						<label className="mb-1 block text-sm font-medium text-slate-700">
							求職者お問い合わせを検索
						</label>
						<input
							type="text"
							value={searchFilter}
							onChange={(event) => setSearchFilter(event.target.value)}
							placeholder="氏名、メール、電話番号で検索..."
							className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
						/>
					</div>

					<div className="w-full md:max-w-xs">
						<label className="mb-1 block text-sm font-medium text-slate-700">
							日付で絞り込み
						</label>
						<input
							type="date"
							value={dateFilter}
							onChange={(event) => setDateFilter(event.target.value)}
							className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
						/>
					</div>

					<button
						type="button"
						onClick={() => {
							setSearchFilter("");
							setDateFilter("");
						}}
						className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-300"
					>
						リセット
					</button>

					<div className="md:ml-auto">
						<Link
							to="/admin/dashboard"
							className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
						>
							ダッシュボードへ戻る
						</Link>
					</div>
				</div>

				<div className="overflow-hidden rounded-xl bg-white shadow-sm">
					{loading ? (
						<div className="p-6 text-sm text-slate-600">求職者お問い合わせを読み込み中...</div>
					) : error ? (
						<div className="p-6 text-sm text-red-600">{error}</div>
					) : filteredContacts.length === 0 ? (
						<div className="p-6 text-sm text-slate-600">求職者お問い合わせが見つかりません。</div>
					) : (
						<div className="overflow-x-auto">
							<table className="min-w-full border-collapse">
								<thead className="bg-slate-50">
									<tr>
										<th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
											番号
										</th>
										<th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
											氏名
										</th>
										<th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
											連絡先
										</th>
										<th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
											お問い合わせ種別
										</th>
										<th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
											履歴書
										</th>
										<th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
											作成日
										</th>
										<th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
											操作
										</th>
									</tr>
								</thead>

								<tbody>
									{filteredContacts.map((contact, index) => (
										<tr key={contact.id} className="hover:bg-slate-50">
											<td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
												{index + 1}
											</td>
											<td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-900">
												<p className="font-medium">{getContactName(contact)}</p>
												<p className="mt-1 text-xs text-slate-500">
													ID #{contact.id}
												</p>
											</td>
											<td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
												<p>{contact.email || "-"}</p>
												<p className="mt-1 text-xs text-slate-500">
													{contact.phoneNumber || "-"}
												</p>
											</td>
											<td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
												{formatInquiryType(contact.candidate?.inquiryType)}
											</td>
											<td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
												{contact.candidate?.resumeUrl ? (
													<button
														type="button"
														onClick={() => handleResumeDownload(contact.id)}
														disabled={downloadingId === contact.id}
														className="cursor-pointer font-medium text-cyan-700 hover:text-cyan-800"
													>
														{downloadingId === contact.id ? "ダウンロード中..." : "ダウンロード"}
													</button>
												) : (
													"-"
												)}
											</td>
											<td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
												{formatDate(contact.createdAt)}
											</td>
											<td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
												<button
													type="button"
													onClick={() => handleDeleteContact(contact.id)}
													disabled={deletingId === contact.id}
													className="inline-flex cursor-pointer rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
												>
													{deletingId === contact.id ? "削除中..." : "削除"}
												</button>
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
