import { Component } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Topbar from "../components/ui/navbar/Topbar";
import Navbar from "../components/ui/navbar/Navbar";
import Footer from "../components/ui/footer/Footer";
import ScrollToTopButton from "../components/ui/scroll/ScrollToTopButton";

class PublicLayoutErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Page Error</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">ページを表示できませんでした</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              一時的な問題が発生しました。ページを再読み込みするか、トップページからもう一度お試しください。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center rounded-sm bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                再読み込み
              </button>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-sm border border-slate-300 px-6 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                ホームへ戻る
              </Link>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default function PublicLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-white">
        <Topbar />
        <Navbar />
        <main className="flex-1 pt-27" role="main">
            <PublicLayoutErrorBoundary resetKey={location.pathname}>
              <Outlet />
            </PublicLayoutErrorBoundary>
        </main>
        <footer className="mt-auto">
          <Footer />
        </footer>
        <ScrollToTopButton />
    </div>
  )
}
