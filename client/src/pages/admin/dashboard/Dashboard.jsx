import { Link } from "react-router-dom";
import LogoutButton from "../../../components/admin/LogoutButton";

// Dashboard action and card icons from Font Awesome via react-icons.
import {
  FaArrowRight,
  FaBuilding,
  FaBriefcase,
  FaRegNewspaper,
  FaUserTie,
} from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";

const dashboardCards = [
  {
    Icon: FaBuilding,
    title: "企業お問い合わせ",
    description: "企業向けのお問い合わせおよびコンタクトフォームを管理。",
    href: "/admin/company-contacts",
  },
  {
    Icon: FaUserTie,
    title: "求職者お問い合わせ",
    description: "求職者からの問い合わせ・応募フォームの送信内容を管理。",
    href: "/admin/candidate-contacts",
  },
  {
    Icon: FaLaptopCode,
    title: "ITソリューションお問い合わせ",
    description: "ITソリューション向けお問い合わせフォームの送信内容を管理。",
    href: "/admin/it-solution-contacts",
  },
  {
    Icon: FaBriefcase,
    title: "求人",
    description: "求人情報の追加および編集を行います。",
    href: "/admin/jobs",
  },
  {
    Icon: FaRegNewspaper,
    title: "お知らせ",
    description: "投稿およびお知らせの管理を行います。",
    href: "/admin/posts",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-[calc(100vh-3rem)] rounded-2xl bg-slate-100 shadow-sm">
      <div className="flex items-center justify-between rounded-t-2xl bg-slate-900 px-6 py-4">
        <h1 className="text-lg font-semibold text-white">Dashboard</h1>
        <LogoutButton />
      </div>

      <div className="flex min-h-[calc(100vh-9rem)] items-center justify-center px-6 py-10">
        <div className="w-full max-w-5xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700">
              Admin Panel
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              Dashboard Content
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              ウェブサイト運営を管理する領域を選択してください。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {dashboardCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl bg-white p-6 shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-(--color-primary)/20">
                    <card.Icon
                      size={20}
                      className="text-(--color-primary)"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {card.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {card.description}
                </p>
                {card.href ? (
                  <Link
                    to={card.href}
                    className="vision-link mt-6 inline-flex items-center gap-2 text-sm font-medium"
                  >
                    Open <FaArrowRight />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="vision-link mt-6 inline-flex items-center gap-2 text-sm font-medium"
                  >
                    Open <FaArrowRight />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
