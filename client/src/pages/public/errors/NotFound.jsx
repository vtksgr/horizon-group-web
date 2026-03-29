import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <section className="flex min-h-[calc(100vh-108px)] items-center px-6 py-16 sm:px-10">
            <div className="mx-auto w-full max-w-5xl rounded-4xl border border-slate-200 bg-white px-6 py-12 shadow-sm sm:px-10 lg:px-14">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Error Page</p>
                        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">404</h1>
                        <h2 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">Page Not Found</h2>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                            お探しのページが見つかりませんでした。URLが間違っているか、ページが移動または削除された可能性があります。
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/"
                                className="inline-flex items-center justify-center rounded-sm bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                            >
                                ホームへ戻る
                            </Link>
                            <Link
                                to="/jobs"
                                className="inline-flex items-center justify-center rounded-sm border border-slate-300 px-6 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                            >
                                求人一覧を見る
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[1.75rem] bg-slate-50 p-6 sm:p-8">
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 sm:p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Need help?</p>
                            <h3 className="mt-3 text-xl font-semibold text-slate-900">よくある原因</h3>
                            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                                <li>URLの入力に誤りがある</li>
                                <li>古いブックマークを開いている</li>
                                <li>公開終了したページにアクセスしている</li>
                            </ul>
                            <div className="mt-6 border-t border-slate-200 pt-6">
                                <p className="text-sm text-slate-600">目的のページが見つからない場合は、各サービスページやお問い合わせページから再度お探しください。</p>
                                <Link
                                    to="/contact_company"
                                    className="mt-4 inline-flex text-sm font-medium text-sky-700 underline underline-offset-4"
                                >
                                    お問い合わせはこちら
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}