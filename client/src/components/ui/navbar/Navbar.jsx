// client/src/components/public/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@assets/images/logo/logo.svg";
import { useLanguage } from "../../../context/LanguageContext";

const navText = {
    ja: {
        home: "ホーム",
        education: "教育業務",
        itSolution: "ITソリューション",
        news: "お知らせ",
        about: "私たちについて",
        jobs: "求人",
        faq: "FAQ",
        company: "会社概要",
        service: "サービス",
        contact: "お問い合わせ",
        contactCompany: "企業様向け",
        contactCandidate: "求職者様向け",
        contactItSolution: "ITソリューション向け",
    },
    en: {
        home: "Home",
        education: "Education",
        itSolution: "IT Solution",
        news: "News",
        about: "About",
        jobs: "Jobs",
        faq: "FAQ",
        company: "Company",
        service: "Services",
        contact: "Contact",
        contactCompany: "For Companies",
        contactCandidate: "For Candidates",
        contactItSolution: "For IT Solutions",
    },
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { language } = useLanguage();
    const t = navText[language] || navText.ja;

    return (
        <nav className="fixed top-9 left-0 w-full z-1000 h-18 bg-white shadow-sm px-4 md:px-8">
            <div className="h-full flex items-center justify-between">
                {/* Logo */}
                <div>
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="logo" className="w-10 h-10 block md:hidden" />
                        <span className="text-2xl font-extrabold text-(--color-dark) tracking-wide pr-2 hidden md:block">
                            HORIZON
                        </span>
                        <span className="text-2xl font-extrabold text-(--color-primary) tracking-wide hidden md:block">
                            GROUP
                        </span>
                    </Link>
                </div>

                {/* Hamburger Button */}
                <button
                    className="lg:hidden flex items-center p-2"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    aria-label="Toggle menu"
                    type="button"
                >
                    {!isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </button>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-8">
                    <li><Link to="/" className="nav-link transition-all duration-200 ease-in-out" onClick={() => setIsOpen(false)}>{t.home}</Link></li>
                    <li><Link to="/career_academy" className="nav-link transition-all duration-200 ease-in-out" onClick={() => setIsOpen(false)}>{t.education}</Link></li>
                    <li><Link to="/it_solution" className="nav-link transition-all duration-200 ease-in-out" onClick={() => setIsOpen(false)}>{t.itSolution}</Link></li>
                    <li><Link to="/posts" className="nav-link transition-all duration-200 ease-in-out" onClick={() => setIsOpen(false)}>{t.news}</Link></li>
                    <li><Link to="/jobs" className="nav-link transition-all duration-200 ease-in-out" onClick={() => setIsOpen(false)}>{t.jobs}</Link></li>
                    <li><Link to="/faq" className="nav-link transition-all duration-200 ease-in-out" onClick={() => setIsOpen(false)}>{t.faq}</Link></li>
                    <li><Link to="/company_profile" className="nav-link transition-all duration-200 ease-in-out" onClick={() => setIsOpen(false)}>{t.company}</Link></li>
                    <li className="relative group">
                        <span className="nav-link cursor-pointer transition-all duration-200 ease-in-out">{t.contact}</span>
                        <div className="invisible absolute right-1 top-full z-10 mt-2 min-w-44 rounded-md border border-gray-200 bg-white p-2 opacity-0 shadow-md transition-all duration-200 group-hover:visible group-hover:opacity-100">
                            <Link to="/contact_company" className="block rounded px-2 py-1 text-sm hover:bg-(--color-primary) hover:text-amber-50" onClick={() => setIsOpen(false)}>
                                {t.contactCompany}
                            </Link>
                            <Link to="/contact_candidate" className="block rounded px-2 py-1 text-sm hover:bg-(--color-primary)  hover:text-amber-50" onClick={() => setIsOpen(false)}>
                                {t.contactCandidate}
                            </Link>
                            <Link to="/contact_it_solution" className="block rounded px-2 py-1 text-sm hover:bg-(--color-primary)  hover:text-amber-50" onClick={() => setIsOpen(false)}>
                                {t.contactItSolution}
                            </Link>
                        </div>
                    </li>

                </ul>
            </div>

            {/* Mobile / Tablet Menu */}
            <ul
                id="mobile-menu"
                className={[
                    "flex flex-col gap-4 p-4 border-t border-t-gray-300 bg-white lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2 pointer-events-none",
                ].join(" ")}
            >
                <li><Link to="/" onClick={() => setIsOpen(false)}>{t.home}</Link></li>
                <li><Link to="/service" onClick={() => setIsOpen(false)}>{t.service}</Link></li>
                <li><Link to="/career_academy" onClick={() => setIsOpen(false)}>{t.education}</Link></li>
                <li><Link to="/it_solution" onClick={() => setIsOpen(false)}>{t.itSolution}</Link></li>
                <li><Link to="/posts" onClick={() => setIsOpen(false)}>{t.news}</Link></li>
                <li><Link to="/jobs" onClick={() => setIsOpen(false)}>{t.jobs}</Link></li>
                <li><Link to="/faq" onClick={() => setIsOpen(false)}>{t.faq}</Link></li>
                <li className="font-medium pt-2">{t.contact}</li>
                <li><Link to="/contact_company" onClick={() => setIsOpen(false)}>{t.contactCompany}</Link></li>
                <li><Link to="/contact_candidate" onClick={() => setIsOpen(false)}>{t.contactCandidate}</Link></li>
                <li><Link to="/contact_it_solution" onClick={() => setIsOpen(false)}>{t.contactItSolution}</Link></li>
            </ul>
        </nav>
    );
}

