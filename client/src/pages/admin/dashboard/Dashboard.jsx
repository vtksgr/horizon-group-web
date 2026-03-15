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

const dashboardCards = [
  {
    Icon: FaBuilding,
    title: "Company Contact",
    description: "Manage company inquiries and contact forms.",
  },
  {
    Icon: FaUserTie,
    title: "Candidate Contact",
    description: "Manage candidate contact submissions.",
  },
  {
    Icon: FaBriefcase,
    title: "Job",
    description: "Add or edit job listings.",
    href: "/admin/jobs",
  },
  {
    Icon: FaRegNewspaper,
    title: "Post",
    description: "Manage posts and announcements.",
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
              Choose an area to manage website operations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {dashboardCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl bg-white p-6 shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[var(--color-primary)]/20">
                    <card.Icon
                      size={20}
                      className="text-[var(--color-primary)]"
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
