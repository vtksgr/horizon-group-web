import Breadcrumbs from "../../components/ui/breadcrumbs/Breadcrumbs";
import hbBuildingImg from "@assets/images/common/hb-building-img.jpg";

export default function CompanyProfile() {
    const breadcrumbItems = [
        { label: "ホーム", to: "/" },
        { label: "会社概要", to: "/company_profile" },
    ];

    return (
        <>
            <section className="w-full mt-32 border-b border-gray-300">
                <div className="lg:w-[75%] mx-auto px-7 lg:px-0 pb-9 page_title">
                    <h1 className="font-semibold">COMPANY PROFILE</h1>
                    <h6 className="font-semibold text-[var(--color-text-secondary)]">会社情報</h6>
                </div>
            </section>

            <section>
                <div className="lg:w-[75%] mx-auto px-7 lg:px-0">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
            </section>

            <section className="md:w-[75%] mx-auto px-6 md:px-0 mt-16 lg:mt-24 company-profile">
                <div className="mt-10 lg:mt-16">


                    <ul className="divide-y divide-gray-300 mt-8">
                        <li className="flex flex-col md:flex-row py-8 text-sm">
                            <p className="w-32 min-w-fit font-semibold">会社名</p>
                            <div>
                                <p className="md:ml-8 pb-2">株式会社HORIZON GROUP （ホライゾングループ）</p>
                                <p className="md:ml-8">HORIZON GROUP Co., Ltd.</p>
                            </div>
                        </li>
                        <li className="flex flex-col md:flex-row py-8 text-sm">
                            <p className="w-32 min-w-fit font-semibold">住所</p>
                            <div>
                                <p className="md:ml-8">〒169-0073</p>
                                <p className="md:ml-8">東京都新宿区百人町1丁目20番26号バラードハイムムサシノビル806号室</p>
                            </div>
                        </li>
                        <li className="flex flex-col md:flex-row py-8 text-sm">
                            <p className="w-32 min-w-fit font-semibold">会社設立</p>
                            <p className="md:ml-8">2024年05月</p>
                        </li>
                        <li className="flex flex-col md:flex-row py-8 text-sm">
                            <p className="w-32 min-w-fit font-semibold">資本金</p>
                            <p className="md:ml-8">10,000,000円</p>
                        </li>
                        <li className="flex flex-col md:flex-row py-8 text-sm">
                            <p className="w-32 min-w-fit font-semibold">代表取締役/CEO</p>
                            <p className="md:ml-8">ダンギ ティラク</p>
                        </li>
                        <li className="flex flex-col md:flex-row py-8 text-sm">
                            <p className="w-32 min-w-fit font-semibold">取締役/COO</p>
                            <p className="md:ml-8">スベディ サントス</p>
                        </li>
                        <li className="flex flex-col md:flex-row py-8 text-sm">
                            <p className="w-32 min-w-fit font-semibold">URL</p>
                            <p className="md:ml-8">https://www.horizongroup.co.jp/</p>
                        </li>
                        <li className="flex flex-col md:flex-row py-8 text-sm">
                            <p className="w-32 min-w-fit font-semibold">Eメール</p>
                            <p className="md:ml-8">info@horizongroup.co.jp</p>
                        </li>
                        <li className="flex flex-col md:flex-row py-8 text-sm">
                            <p className="w-32 min-w-fit font-semibold">TEL</p>
                            <p className="md:ml-8">03-5497-8734</p>
                        </li>
                        <li className="flex flex-col md:flex-row py-8 text-sm">
                            <p className="w-32 min-w-fit font-semibold">FAX</p>
                            <p className="md:ml-8">03-5497-8735</p>
                        </li>
                        <li className="flex flex-col md:flex-row py-8 text-sm">
                            <p className="w-32 min-w-fit font-semibold">事業内容</p>
                            <p className="md:ml-8 leading-7">
                                外国人向けの人材紹介
                                <br />
                                外国人労働者の就労支援サポート
                                <br />
                                南アジア各国からの留学生紹介
                                <br />
                                ビザ申請手続のサポート(新規・更新)
                                <br />
                                IT関連(アプリ開発・Webページ制作・SNS運用代行)
                                <br />
                                ネパールにおける日本語学校の運営
                                <br />
                                外国人インターンシップ受入サポート支援業務
                            </p>
                        </li>
                        <li className="flex flex-col md:flex-row py-8 text-sm border-b border-gray-300">
                            <p className="w-32 min-w-fit font-semibold">許可等</p>
                            <p className="md:ml-8">有料職業紹介事業許可番号：13 – ユ – 317409</p>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="md:w-[75%] mx-auto px-6 md:px-0 mt-20 mb-28 lg:mt-32 lg:mb-40 access">
                <div className="flex items-end mb-9 gap-4">
                    <h3 className="font-semibold text-2xl">ACCESS</h3>
                    <h6 className="font-semibold text-[var(--color-text-secondary)]">アクセス</h6>
                </div>

                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-7/12 px-4 mb-4 md:mb-0">
                        <div className="h-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.058600579586!2d139.693767576232!3d35.7001755289325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188df333d0cda5%3A0x64755b23f013069e!2z5qCq5byP5Lya56S-SE9SSVpPTiBHUk9VUA!5e0!3m2!1sen!2sjp!4v1755003397349!5m2!1sen!2sjp"
                                className="w-full h-[500px] md:h-full shadow-md rounded-lg"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div className="mt-6">
                                <p className="mb-2">株式会社HORIZON GROUP （ホライゾングループ）</p>
                                <p className="text-sm">〒169-0073 東京都新宿区百人町1丁目20番26号</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-5/12 px-4">
                        <div className="h-[500px] md:h-full overflow-hidden">
                            <img
                                src={hbBuildingImg}
                                alt="hg-location-building"
                                className="w-full h-full object-cover object-center shadow-md rounded-lg"
                            />
                        </div>
                        <p className="mt-6 text-right">Google Map で見る</p>
                    </div>
                </div>
            </section>
        </>
    );
}
