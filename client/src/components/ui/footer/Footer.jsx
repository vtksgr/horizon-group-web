import Logo from "@assets/images/logo/logo.svg";
import { Link } from "react-router-dom";
import useLocalizedCopy from "../../../hooks/useLocalizedCopy";

import { FaFacebook, FaTiktok } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const footerCopy = {
    ja: {
        slogan: "世界と日本をつなぐチカラ",
        address: "〒105-0011 東京都新宿区百人町1-20-26バラードハイムムサシノビル806",
        links: {
            greeting: "会社概要",
            register: "求人情報",
            service: "サービス",
            education: "教育業務",
            news: "お知らせ",
            company: "会社概要",
            contact: "お問い合わせ",
            contactCompany: "企業様向け",
            contactCandidate: "求職者様向け",
            privacy: "プライバシーポリシー",
        },
    },
    en: {
        slogan: "Connecting Japan with the world",
        address: "1-20-26 Hyakuninchō, Shinjuku-ku, Tokyo 105-0011, Ballade Heim Musashino Building 806",
        links: {
            greeting: "Company",
            register: "Jobs",
            service: "Services",
            education: "Education",
            news: "News",
            company: "Company",
            contact: "Contact",
            contactCompany: "For Companies",
            contactCandidate: "For Candidates",
            privacy: "Privacy Policy",
        },
    },
};

export default function Footer() {
    const t = useLocalizedCopy(footerCopy);

    return (
        <section className='bg-gray-200 border-t-2 border-gray-200 mx-auto pt-16'>
            <div className='xl:w-[75%] xl:mx-auto px-4 md:px-8 xl:px-0 pb-8 flex flex-col gap-8 xl:flex-row xl:justify-between'>
                {/* left column */}
                <div className=''>
                    <div className='flex'>
                        <div className="w-20 h-20 mr-4">
                            <img
                                src={Logo}
                                alt="logo"
                                className="object-cover rounded-xl w-full h-auto"
                            />
                        </div>
                        <div>
                            <h6 className="font-bold text-(--color-text-secondary)">{t.slogan}</h6>
                            <h2 className="font-bold "><span className="text-(--color-dark)">HORIZON</span> <span className="text-(--color-primary)">GROUP</span></h2>
                        </div>
                    </div>
                    <div className=''>
                        <p className="text-[15px]">{t.address}</p>
                        <p className="text-[15px]">Tel. 03-5497-8734 Fax. 03-5497-8735</p>
                        <p className="text-[15px]">info@horizongroup.co.jp</p>
                    </div>
                </div>

                {/* footer menu: right column */}
                <div className=''>
                    <div className=''>
                        <ul className='flex flex-wrap gap-x-4 gap-y-2 xl:justify-end'>
                            <li><Link to="/company_profile" className="nav-link transition-all duration-200 ease-in-out">{t.links.greeting}</Link></li>
                            <li><Link to="/jobs" className="nav-link transition-all duration-200 ease-in-out">{t.links.register}</Link></li>
                            <li><Link to="/career_academy" className="nav-link transition-all duration-200 ease-in-out">{t.links.service}</Link></li>
                            <li><Link to="/career_academy" className="nav-link transition-all duration-200 ease-in-out">{t.links.education}</Link></li>
                            <li><Link to="/posts" className="nav-link transition-all duration-200 ease-in-out">{t.links.news}</Link></li>
                            <li><Link to="/company_profile" className="nav-link transition-all duration-200 ease-in-out">{t.links.company}</Link></li>
                            <li className="relative group">
                                <span className="nav-link cursor-pointer transition-all duration-200 ease-in-out">{t.links.contact}</span>
                                <div className="invisible absolute left-0 top-full z-10 mt-2 min-w-40 rounded-md border border-gray-200 bg-white p-2 opacity-0 shadow-md transition-all duration-200 group-hover:visible group-hover:opacity-100">
                                    <Link to="/contact_company" className="block rounded px-2 py-1 text-sm hover:bg-gray-100">
                                        {t.links.contactCompany}
                                    </Link>
                                    <Link to="/contact_candidate" className="block rounded px-2 py-1 text-sm hover:bg-gray-100">
                                        {t.links.contactCandidate}
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="flex xl:justify-end pt-8">
                        <ul className="flex gap-4">
                            <li className="text-[22px]"><FaFacebook /></li>
                            <li className="text-[22px]"><FaTiktok /></li>
                            <li className="text-[22px]"><FaSquareXTwitter /></li>
                        </ul>
                    </div>
                    <div className="flex xl:justify-end pt-8">
                        <p className="text-sm">
                            Designed & Developed by 
                            <a href="https://vtksgr.github.io/portfolio/" target="_blank" rel="noopener">
                                <span className="font-bold"> Sagar Pariyar</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Policies & copyright */}
            <div className='border-t border-gray-300 mt-4 py-4 flex flex-col gap-2 md:flex-row md:justify-between px-4 md:px-8'>
                {/* policies */}
                <div className=''>
                    <Link to="/privacy_policy" className="nav-link transition-all duration-200 ease-in-out text-[12px]">{t.links.privacy}</Link>
                </div>
                <div className=''>
                    <small className="text-[12px] text-[#999]">© 2025 Horizon Group. All rights reserved.</small>
                </div>
            </div>
        </section>
    );
}
