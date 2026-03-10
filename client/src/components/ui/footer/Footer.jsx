import Logo from "@assets/images/logo/logo.svg";
import { Link } from "react-router-dom";

import { FaFacebook, FaTiktok } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
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
                            <h6 className="font-bold text-[var(--color-text-secondary)]">世界と日本をつなぐチカラ</h6>
                            <h2 className="font-bold "><span className="text-[var(--color-dark)]">HORIZON</span> <span className="text-[var(--color-primary)]">GROUP</span></h2>
                        </div>
                    </div>
                    <div className=''>
                        <p className="text-[15px]">〒105-0011 東京都新宿区百人町1-20-26バラードハイムムサシノビル806</p>
                        <p className="text-[15px]">Tel. 03-5497-8734 Fax. 03-5497-8735</p>
                        <p className="text-[15px]">info@horizongroup.co.jp</p>
                    </div>
                </div>

                {/* right column */}
                <div className=''>
                    <div className=''>
                        <ul className='flex flex-wrap gap-x-4 gap-y-2 xl:justify-end'>
                            <li><Link to="/greeting" className="nav-link transition-all duration-200 ease-in-out">ご挨拶</Link></li>
                            <li><span className="nav-link transition-all duration-200 ease-in-out">登録欄</span></li>
                            <li><span className="nav-link transition-all duration-200 ease-in-out">サービス</span></li>
                            <li><span className="nav-link transition-all duration-200 ease-in-out">教育業務</span></li>
                            <li><span className="nav-link transition-all duration-200 ease-in-out">お知らせ</span></li>
                            <li><span className="nav-link transition-all duration-200 ease-in-out">会社概要</span></li>
                            <li><span className="nav-link transition-all duration-200 ease-in-out">お問い合わせ</span></li>
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
                </div>
            </div>

            {/* Policies & copyright */}
            <div className='border-t border-gray-300 mt-4 py-4 flex flex-col gap-2 md:flex-row md:justify-between px-4 md:px-8'>
                {/* policies */}
                <div className=''>
                    <Link to="/privacy_policy" className="nav-link transition-all duration-200 ease-in-out text-[12px]">プライバシーポリシー</Link>
                </div>
                <div className=''>
                    <small className="text-[12px] text-[#999]">© 2025 Horizon Group. All rights reserved.</small>
                </div>
            </div>
        </section>
    );
}
