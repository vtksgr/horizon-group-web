import { FaCheck } from "react-icons/fa6";
import { BsFillBuildingsFill, BsPeopleFill, BsTranslate } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";
// IMAGE
import hbBuilding from "@assets/images/common/hb-building-img.jpg";
import hbBusiness from "@assets/images/common/hb-business-img.jpg";
import hbStudent from "@assets/images/common/hb-student.jpg";
import hbTranslation from "@assets/images/common/hg-translation.jpg";



export default function ServiceSection() {
    return (
        <section className="w-full xl:w-[75%] px-4 sm:px-6 lg:px-8 xl:px-0 mx-auto">
            {/* Title */}
            <div className="text-center">
                <h2 className="font-bold mb-2 sec-title">
                    SERVICE
                </h2>
                <h6 className="text-base md:text-lg font-medium mb-8">
                    当社サービス
                </h6>
            </div>

            {/* 人材紹介サービス */}
            <div className="mt-9">
                <div className="mb-9">
                    <h4 className="border-l-4 border-[var(--color-primary)] pl-4">人材紹介サービス</h4>
                    <p className="md:pl-6">私たちは、日本で働きたい外国人と、優秀な人材を求める企業様をつなぐ人材紹介サービスを展開しています。採用から就労まで、すべてのステップ
                        で丁寧かつ的確にサポートいたします。</p>
                </div>

                <div className="flex flex-col md:flex-row md:items-stretch border border-gray-300 rounded-lg shadow-sm">
                    <div className="md:w-5/12 p-4 md:flex">
                        <div className="overflow-hidden rounded-xl shadow-md md:flex-1">
                            <img
                                src={hbBuilding}
                                alt="人材紹介サービスのイメージ"
                                className="w-full h-56 sm:h-72 md:h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="md:w-7/12 p-6">
                            <h4 className="font-semibold pb-2 flex items-start gap-2 border-b border-gray-300">
                                <span className="p-2 bg-blue-200 rounded"><BsFillBuildingsFill className="text-[var(--color-primary)] text-lg" /></span>
                                FOR COMPANY{" "}
                                <span className="text-[var(--color-primary)]">企業様向け</span>
                            </h4>
                        <p className="my-4 font-medium">外国籍人材の採用をご検討中の企業様に、以下のサポートを提供します：</p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>採用ニーズに合った外国籍人材のご紹介</span></li>
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>採用に関する手続きや対応の全面サポート</span></li>
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>外国籍人材との面談・面接支援</span></li>
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>異文化理解・職場定着に向けたコンサルティング</span></li>
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>就労ビザ取得・変更に伴う書類作成・手続きサポート</span></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-4 flex flex-col md:flex-row md:items-stretch border border-gray-300 rounded-lg shadow-sm">
                    <div className="md:w-5/12 p-4 md:flex">
                        <div className="overflow-hidden rounded-xl shadow-md md:flex-1">
                            <img
                                src={hbBusiness}
                                alt="求職者向けサポートのイメージ"
                                className="w-full h-56 sm:h-72 md:h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="md:w-7/12 p-6">
                            <h4 className="font-semibold pb-2 flex items-start gap-2 border-b border-gray-300">
                                <span className="p-2 bg-blue-200 rounded"><BsPeopleFill className="text-[var(--color-primary)] text-lg" /></span>
                                FOR JOB SEEKERS{" "}
                                <span className="text-[var(--color-primary)]">求職者様向け</span>
                            </h4>
                        <p className="mb-4 font-medium">日本で働きたい外国籍求職者の皆様に、安心して就職できるよう全面的に支援します：</p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>外国籍の方を積極的に採用している企業の紹介</span></li>
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>希望に合った職場への応募・採用サポート</span></li>
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>日本の就職マナーや面接準備に関するアドバイス</span></li>
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>面接時の同席・フォローアップ</span></li>
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>就労ビザの取得・変更に関する手続きサポート</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 留学生サポートサービス */}
            <div className="mt-24">
                <div className="mb-9">
                    <h4 className="border-l-4 border-[var(--color-primary)] pl-4">留学生サポートサービス</h4>
                    <p className="md:pl-6">日本への留学を希望される外国人の方に対し、学校選びから入学、生活支援、就労支援まで、トータルでサポートいたします</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-stretch border border-gray-300 rounded-lg shadow-sm">
                    <div className="md:w-5/12 p-4 md:flex">
                        <div className="overflow-hidden rounded-xl shadow-md md:flex-1">
                            <img
                                src={hbStudent}
                                alt="留学生サポートサービスのイメージ"
                                className="w-full h-56 sm:h-72 md:h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="md:w-7/12 p-6">
                            <h4 className="font-semibold pb-2 flex items-start gap-2 border-b border-gray-300">
                                <span className="p-2 bg-blue-200 rounded"><FaGraduationCap className="text-[var(--color-primary)] text-lg" /></span>
                                FOR STUDENT{" "}
                                <span className="text-[var(--color-primary)]">提供サービス：</span>
                            </h4>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>日本語学校、専門学校、大学の紹介</span></li>
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>入学手続きや必要書類の準備支援</span></li>
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>学生ビザ申請および更新サポート</span></li>
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>来日後の生活支援（住居探し、携帯契約、銀行口座開設など）</span></li>
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>アルバイトや卒業後の就職活動支援</span></li>
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span><span>メンタル・文化適応に関する相談受付</span></li>
                        </ul>
                        <p className="my-4 font-medium">留学生の皆様が安心して学び、成長できる環境づくりをお手伝いいたします。</p>
                    </div>
                </div>
            </div>

            {/* 翻訳・通訳サービス */}
            <div className="mt-24">
                <div className="mb-9">
                    <h4 className="border-l-4 border-[var(--color-primary)] pl-4">翻訳・通訳サービス</h4>
                    <p className="md:pl-6">多言語対応が求められるさまざまなシーンにおいて、質の高い翻訳・通訳サービスを提供しています。ビジネスから医療、教育、行政まで、幅広く対応可能です。</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-stretch border border-gray-300 rounded-lg shadow-sm">
                    <div className="md:w-5/12 p-4 md:flex">
                        <div className="overflow-hidden rounded-xl shadow-md md:flex-1">
                            <img
                                src={hbTranslation}
                                alt="翻訳・通訳サービスのイメージ"
                                className="w-full h-56 sm:h-72 md:h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="md:w-7/12 p-6">
                            <h4 className="font-semibold pb-2 flex items-start gap-2 border-b border-gray-300">
                                <span className="p-2 bg-blue-200 rounded"><BsTranslate className="text-[var(--color-primary)] text-lg" /></span>
                                LANGUAGE SUPPORT{" "}
                                <span className="text-[var(--color-primary)]">対応言語：</span>
                            </h4>
                        <p className="mb-4 font-medium">日本語、 英語、 韓国語、 ネパール語、 ヒンディー語</p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span>
                                通訳： ビジネス会議、商談、医療現場、教育現場、行政手続きなど</li>
                            <li className="flex items-start gap-2"><span className="mt-1 shrink-0"><FaCheck className="text-[var(--color-primary)]" /></span>
                                翻訳： 契約書、会社案内、マニュアル、WEBコンテンツ、履歴書など</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
