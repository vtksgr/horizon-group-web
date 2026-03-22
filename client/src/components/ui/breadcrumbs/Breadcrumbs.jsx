import { Link } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";

export default function Breadcrumbs({ items = [] }) {
    const safeItems = Array.isArray(items) ? items : [];

    return (
        <nav className="my-4 flex text-sm" aria-label="Breadcrumb">
            <p className="mr-2">
                <FaHouse />
            </p>

            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {safeItems.map((crumb, idx) => {
                    const isLast = idx === safeItems.length - 1;

                    return (
                        <li key={`${crumb.label}-${idx}`} className="inline-flex items-center">
                            {!isLast ? (
                                <>
                                    {crumb.to ? (
                                        <Link
                                            to={crumb.to}
                                            className="text-gray-500 transition-colors duration-150 hover:text-blue-600"
                                        >
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className="text-gray-500">{crumb.label}</span>
                                    )}

                                    <svg
                                        className="mx-2 h-3 w-3 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </>
                            ) : (
                                <span className="border-b border-(--color-primary)" aria-current="page">
                                    {crumb.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
