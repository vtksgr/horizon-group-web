import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";
import LogoutButton from "../../../components/admin/LogoutButton";

const CONTACT_QUERY = {
  type: "itsolution",
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

function formatEnumLabel(value) {
  if (!value) return "-";

  return String(value)
    .toLowerCase()
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function formatItSolutionInquiryType(value) {
  const inquiryTypeMap = {
    WEB_DEVELOPMENT: "Web Development",
    DESIGN_AND_BRANDING: "Design and Branding",
    DIGITAL_MARKETING_SEO: "Digital Marketing & SEO",
    IT_SUPPORT_CONSULTING: "IT Support & Consulting",
    DESIGN_PRINT: "Design Print",
    OTHERS: "Others",
  };

  if (!value) return "-";
  return inquiryTypeMap[value] || formatEnumLabel(value);
}

function getContactName(contact) {
  return [contact.firstName, contact.lastName].filter(Boolean).join(" ") || "-";
}

function sortByNewest(left, right) {
  const leftTime = new Date(left.createdAt || 0).getTime();
  const rightTime = new Date(right.createdAt || 0).getTime();
  return rightTime - leftTime;
}

export default function ItSolutionContactList() {
  const [contacts, setContacts] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

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
          setError(err?.message || "ITソリューションお問い合わせの読み込みに失敗しました。");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadContacts();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredContacts = useMemo(() => {
    const needle = searchFilter.trim().toLowerCase();

    return contacts
      .filter((contact) => {
        const fullName = getContactName(contact).toLowerCase();
        const email = String(contact.email || "").toLowerCase();
        const companyName = String(contact.itSolution?.companyName || "").toLowerCase();

        const matchesSearch =
          !needle ||
          fullName.includes(needle) ||
          email.includes(needle) ||
          companyName.includes(needle);

        const matchesDate = !dateFilter || toInputDate(contact.createdAt) === dateFilter;

        return matchesSearch && matchesDate;
      })
      .sort(sortByNewest);
  }, [contacts, dateFilter, searchFilter]);

  return (
    <div className="min-h-[calc(100vh-3rem)] rounded-2xl bg-slate-100 shadow-sm">
      <div className="flex items-center justify-between rounded-t-2xl bg-slate-900 px-6 py-4">
        <h1 className="text-lg font-semibold text-white">ITソリューションお問い合わせ一覧</h1>
        <LogoutButton />
      </div>

      <div className="px-6 py-6">
        <div className="mb-4 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-end">
          <div className="w-full md:max-w-sm">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              ITソリューションお問い合わせを検索
            </label>
            <input
              type="text"
              value={searchFilter}
              onChange={(event) => setSearchFilter(event.target.value)}
              placeholder="氏名、会社名、メールで検索..."
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
            <div className="p-6 text-sm text-slate-600">ITソリューションお問い合わせを読み込み中...</div>
          ) : error ? (
            <div className="p-6 text-sm text-red-600">{error}</div>
          ) : filteredContacts.length === 0 ? (
            <div className="p-6 text-sm text-slate-600">ITソリューションお問い合わせが見つかりません。</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      番号
                    </th>
                    <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      会社名
                    </th>
                    <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      担当者
                    </th>
                    <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      お問い合わせ種別
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
                      <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                        <p className="font-medium text-slate-900">
                          {contact.itSolution?.companyName || "-"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">ID #{contact.id}</p>
                      </td>
                      <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                        <p>{getContactName(contact)}</p>
                        <p className="mt-1 text-xs text-slate-500">{contact.email || "-"}</p>
                      </td>
                      <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                        {formatItSolutionInquiryType(contact.itSolution?.inquiryType)}
                      </td>
                      <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                        {formatDate(contact.createdAt)}
                      </td>
                      <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/it-solution-contacts/${contact.id}`}
                            className="inline-flex rounded-md border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-800 hover:bg-cyan-100"
                          >
                            詳細
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeleteContact(contact.id)}
                            disabled={deletingId === contact.id}
                            className="inline-flex cursor-pointer rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {deletingId === contact.id ? "削除中..." : "削除"}
                          </button>
                        </div>
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