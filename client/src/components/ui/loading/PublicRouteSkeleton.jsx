export default function PublicRouteSkeleton() {
    return (
        <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />
                <div className="h-12 w-64 animate-pulse rounded bg-slate-200" />

                <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />
                        <div className="mt-6 h-5 w-40 animate-pulse rounded bg-slate-200" />
                        <div className="mt-4 h-10 w-4/5 animate-pulse rounded bg-slate-200" />
                        <div className="mt-6 space-y-3">
                            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                            <div className="h-4 w-11/12 animate-pulse rounded bg-slate-200" />
                            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="h-5 w-28 animate-pulse rounded bg-slate-200" />
                        <div className="mt-5 space-y-4">
                            <div className="h-20 animate-pulse rounded-2xl bg-slate-200" />
                            <div className="h-20 animate-pulse rounded-2xl bg-slate-200" />
                            <div className="h-20 animate-pulse rounded-2xl bg-slate-200" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}