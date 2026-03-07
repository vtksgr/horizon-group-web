// client/src/components/public/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/react.svg"; // replace with your real logo file

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <nav className="fixed top-9 left-0 w-full z-[1000] h-[72px] bg-white shadow-sm px-4 md:px-8">
            <div className="h-full flex items-center justify-between">
                {/* Logo */}
                <div>
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="logo" className="w-[40px] h-[40px] block md:hidden" />
                        <span className="text-2xl font-extrabold text-[#0D0F11] tracking-wide pr-2 hidden md:block">
                            HORIZON
                        </span>
                        <span className="text-2xl font-extrabold text-[var(--color-primary)] tracking-wide hidden md:block">
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
                    <li><Link to="/" className="nav-link transition-all duration-200 ease-in-out">ホーム</Link></li>
                    <li><Link to="/career_academy" className="nav-link transition-all duration-200 ease-in-out">教育業務</Link></li>
                    <li><Link to="/blogs_item" className="nav-link transition-all duration-200 ease-in-out">お知らせ</Link></li>
                                        <li><Link to="/about" className="nav-link transition-all duration-200 ease-in-out">私たちについて</Link></li>
                    <li><Link to="/faq" className="nav-link transition-all duration-200 ease-in-out">FAQ</Link></li>
                    <li><Link to="/company_profile" className="nav-link transition-all duration-200 ease-in-out">{"\u4f1a\u793e\u6982\u8981"}</Link></li>

                </ul>
            </div>

            {/* Mobile / Tablet Menu */}
            <ul
                id="mobile-menu"
                className={[
                    "flex flex-col gap-4 mt-4 lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2 pointer-events-none",
                ].join(" ")}
            >
                <li><Link to="/">ホーム</Link></li>
                <li><Link to="/service">サービス</Link></li>
                <li><Link to="/career_academy">教育業務</Link></li>
                <li><Link to="/blogs_item">お知らせ</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/company_profile">{"\u4f1a\u793e\u6982\u8981"}</Link></li>
                <li><Link to="/contact">お問い合わせ</Link></li>
            </ul>
        </nav>
    );
}




