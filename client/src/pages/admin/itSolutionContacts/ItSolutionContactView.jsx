import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../api/axios";
import LogoutButton from "../../../components/admin/LogoutButton";

function formatDateTime(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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
  if (!contact) return "-";
  return [contact.firstName, contact.lastName].filter(Boolean).join(" ") || "-";
}

function normalizeError(err) {
  const message = err?.response?.data?.message || err?.message;
  return message || "ITソリューションお問い合わせの読み込みに失敗しました。";
}

function ContactInfoRow({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm text-slate-800">{value || "-"}</p>
    </div>
  );
}

export default function ItSolutionContactView() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadContact() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/api/admin/contacts/${id}`);
        const payload = response.data?.data || null;

        if (mounted) {
          if (payload?.type !== "ITSOLUTION") {
            setError("このデータはITソリューションお問い合わせではありません。");
            setContact(null);
          } else {
            setContact(payload);
          }
        }
      } catch (err) {
        if (mounted) {
          setError(normalizeError(err));
          setContact(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (!id) {
      setError("お問い合わせIDが見つかりません。");
      setLoading(false);
      return undefined;
    }

    loadContact();

    return () => {
      mounted = false;
    };
  }, [id]);

  const pageTitle = useMemo(() => {
    if (!contact) return "ITソリューションお問い合わせ詳細";
    return contact.itSolution?.companyName || getContactName(contact);
  }, [contact]);

  return (
    <div className="min-h-[calc(100vh-3rem)] rounded-2xl bg-slate-100 shadow-sm">
      <div className="flex items-center justify-between rounded-t-2xl bg-slate-900 px-6 py-4">
        <h1 className="text-lg font-semibold text-white">{pageTitle}</h1>
        <LogoutButton />
      </div>

      <div className="px-6 py-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Link
            to="/admin/it-solution-contacts"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ITソリューションお問い合わせ一覧へ戻る
          </Link>
          <Link
            to="/admin/dashboard"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ダッシュボードへ戻る
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl bg-white p-5 shadow-sm">
          {loading ? (
            <p className="text-sm text-slate-600">ITソリューションお問い合わせを読み込み中...</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : !contact ? (
            <p className="text-sm text-slate-600">お問い合わせが見つかりません。</p>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                <ContactInfoRow label="お問い合わせID" value={String(contact.id)} />
                <ContactInfoRow label="会社名" value={contact.itSolution?.companyName} />
                <ContactInfoRow label="担当者" value={getContactName(contact)} />
                <ContactInfoRow label="メールアドレス" value={contact.email} />
                <ContactInfoRow
                  label="お問い合わせ種別"
                  value={formatItSolutionInquiryType(contact.itSolution?.inquiryType)}
                />
                <ContactInfoRow label="作成日時" value={formatDateTime(contact.createdAt)} />
              </div>

              <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">お問い合わせ内容</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
                  {contact.message || "-"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}