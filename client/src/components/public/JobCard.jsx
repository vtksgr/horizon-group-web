function JobMeta({ label, value }) {
    if (!value) {
        return null;
    }

    return (
        <div className="rounded-md border border-slate-200 bg-white px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">{label}</p>
            <p className="text-sm text-(--color-dark)">{value}</p>
        </div>
    );
}

export default function JobCard({ job, labels, language = "ja", dateLocale = "ja-JP" }) {
    if (!job) {
        return null;
    }

    const createdAt = job.createdAt ? new Date(job.createdAt) : null;
    const formattedDate = createdAt && !Number.isNaN(createdAt.getTime()) ? createdAt.toLocaleDateString(dateLocale) : "-";
    const title = job.title || (language === "en" ? "Untitled Job" : "タイトル未設定");
    const statusLabel = job.status === "URGENT_HIRE" ? labels.urgent : labels.vacancy;

    return (
        <article className="rounded-xl border border-(--color-border) bg-[#f2f5f7] p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-(--color-dark)">{title}</h2>
                    <p className="mt-1 text-sm text-(--color-text-secondary)">{labels.posted}: {formattedDate}</p>
                </div>

                <span className="inline-flex w-fit rounded-full bg-(--color-primary)/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-(--color-primary)">
                    {statusLabel}
                </span>
            </div>

            <div className="mt-4 grid gap-2 md:grid-cols-2">
                <JobMeta label={labels.company} value={job.companyName} />
                <JobMeta label={labels.employmentType} value={job.employmentType} />
                <JobMeta label={labels.salary} value={job.salary} />
                <JobMeta label={labels.location} value={job.location} />
                <JobMeta label={labels.workHours} value={job.workHours} />
                <JobMeta label={labels.holidays} value={job.holidays} />
            </div>

            {job.description ? (
                <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">{labels.description}</p>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-(--color-text-secondary)">{job.description}</p>
                </div>
            ) : null}

            {job.skillsRequired ? (
                <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">{labels.skills}</p>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-(--color-text-secondary)">{job.skillsRequired}</p>
                </div>
            ) : null}

            {job.interviewDetails ? (
                <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary)">{labels.interview}</p>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-(--color-text-secondary)">{job.interviewDetails}</p>
                </div>
            ) : null}
        </article>
    );
}