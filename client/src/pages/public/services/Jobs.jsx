import { useEffect, useMemo, useState } from "react";
import api from "../../../api/axios";
import { useLanguage } from "../../../context/LanguageContext";
import useLocalizedCopy from "../../../hooks/useLocalizedCopy";
import Breadcrumbs from "../../../components/ui/breadcrumbs/Breadcrumbs";

const PAGE_SIZE = 5;

const jobsText = {
  ja: {
    breadcrumbs: { home: "ホーム", jobs: "採用情報" },
    section: "採用情報",
    title: "募集中の求人",
    subtitle: "Horizon Groupの最新求人情報をご確認ください。",
    loading: "求人情報を読み込み中...",
    noJobs: "現在、公開中の求人はありません。",
    posted: "掲載日",
    urgent: "急募",
    vacancy: "募集中",
    company: "会社名",
    employmentType: "雇用形態",
    salary: "給与",
    location: "勤務地",
    workHours: "勤務時間",
    holidays: "休日",
    description: "仕事内容",
    skills: "必要スキル",
    interview: "面接情報",
    previous: "前へ",
    next: "次へ",
  },
  en: {
    breadcrumbs: { home: "Home", jobs: "Careers" },
    section: "Careers",
    title: "Open Jobs",
    subtitle: "Browse current opportunities at Horizon Group.",
    loading: "Loading jobs...",
    noJobs: "No jobs available right now.",
    posted: "Posted",
    urgent: "Urgent Hire",
    vacancy: "Vacancy Available",
    company: "Company",
    employmentType: "Employment Type",
    salary: "Salary",
    location: "Location",
    workHours: "Work Hours",
    holidays: "Holidays",
    description: "Description",
    skills: "Skills Required",
    interview: "Interview Details",
    previous: "Previous",
    next: "Next",
  },
};

function formatDate(value, locale) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString(locale);
}

function JobMeta({ label, value }) {
  if (!value) return null;
  return (
    <div className="rounded-md bg-slate-50 px-3 py-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">{label}</p>
      <p className="text-sm text-(--color-dark)">{value}</p>
    </div>
  );
}

export default function Jobs() {
  const { language } = useLanguage();
  const t = useLocalizedCopy(jobsText);
  const dateLocale = language === "en" ? "en-US" : "ja-JP";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;

    async function loadJobs() {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/api/jobs");
        const rows = Array.isArray(res.data?.data) ? res.data.data : [];

        const sorted = [...rows].sort((a, b) => {
          const aTime = new Date(a.createdAt || 0).getTime();
          const bTime = new Date(b.createdAt || 0).getTime();
          return bTime - aTime;
        });

        if (mounted) {
          setJobs(sorted);
          setPage(1);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || (language === "en" ? "Failed to load jobs." : "求人情報の取得に失敗しました。"));
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
  }, [language]);

  const totalPages = Math.max(1, Math.ceil(jobs.length / PAGE_SIZE));

  const pagedJobs = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return jobs.slice(start, end);
  }, [jobs, page]);

  function goToPage(nextPage) {
    const clamped = Math.min(Math.max(nextPage, 1), totalPages);
    setPage(clamped);
  }

  const breadcrumbsItem = [
    { label: t.breadcrumbs.home, to: "/" },
    { label: t.breadcrumbs.jobs, to: "/jobs" },
  ];

  return (
    <>
      <section className="w-full mt-32 border-b border-(--color-border)">
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0 pb-9 page_title">
          <h1 className="font-semibold">JOBS OPENING</h1>
          <h6 className="font-semibold text-(--color-text-secondary)">{t.section}</h6>
        </div>
      </section>

      <section>
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0">
          <Breadcrumbs items={breadcrumbsItem} />
        </div>
      </section>

      <section className="w-full my-16 py-14 md:py-20">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">

        {loading ? (
          <div className="rounded-xl bg-(--color-background) p-6 text-sm text-(--color-text-secondary) shadow-sm">{t.loading}</div>
        ) : error ? (
          <div className="rounded-xl bg-(--color-background) p-6 text-sm text-red-600 shadow-sm">{error}</div>
        ) : pagedJobs.length === 0 ? (
          <div className="rounded-xl bg-(--color-background) p-6 text-sm text-(--color-text-secondary) shadow-sm">{t.noJobs}</div>
        ) : (
          <>
            <div className="space-y-4">
              {pagedJobs.map((job) => (
                <article key={job.id} className="rounded-xl border border-(--color-border) bg-(--color-background) p-5 shadow-sm md:p-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-(--color-dark)">{job.title || (language === "en" ? "Untitled Job" : "タイトル未設定")}</h2>
                      <p className="mt-1 text-sm text-(--color-text-secondary)">{t.posted}: {formatDate(job.createdAt, dateLocale)}</p>
                    </div>

                    <span className="inline-flex w-fit rounded-full bg-(--color-primary)/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-(--color-primary)">
                      {job.status === "URGENT_HIRE" ? t.urgent : t.vacancy}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-2 md:grid-cols-2">
                    <JobMeta label={t.company} value={job.companyName} />
                    <JobMeta label={t.employmentType} value={job.employmentType} />
                    <JobMeta label={t.salary} value={job.salary} />
                    <JobMeta label={t.location} value={job.location} />
                    <JobMeta label={t.workHours} value={job.workHours} />
                    <JobMeta label={t.holidays} value={job.holidays} />
                  </div>

                  {job.description ? (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">{t.description}</p>
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-(--color-text-secondary)">{job.description}</p>
                    </div>
                  ) : null}

                  {job.skillsRequired ? (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">{t.skills}</p>
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-(--color-text-secondary)">{job.skillsRequired}</p>
                    </div>
                  ) : null}

                  {job.interviewDetails ? (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">{t.interview}</p>
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-(--color-text-secondary)">{job.interviewDetails}</p>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>

            {totalPages > 1 ? (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className="rounded-md border border-(--color-border) bg-(--color-background) px-3 py-1.5 text-sm text-(--color-dark) disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t.previous}
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => goToPage(pageNumber)}
                    className={[
                      "rounded-md border px-3 py-1.5 text-sm",
                      pageNumber === page
                        ? "border-(--color-primary) bg-(--color-primary) text-white"
                        : "border-(--color-border) bg-(--color-background) text-(--color-dark)",
                    ].join(" ")}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className="rounded-md border border-(--color-border) bg-(--color-background) px-3 py-1.5 text-sm text-(--color-dark) disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t.next}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
      </section>
    </>
  );
}
