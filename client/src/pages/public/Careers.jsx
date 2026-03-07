import Breadcrumbs from "../../components/ui/breadcrumbs/Breadcrumbs";
import CurriculumSection from "./home/sections/CurriculumSection";

// images
import hgAcademyImg from "@assets/images/common/hgAcademyImg.jpg";
import AcademySupportIcon01 from "@assets/images/icon/academy-support-icon-01.svg";
import AcademySupportIcon02 from "@assets/images/icon/academy-support-icon-02.svg";
import AcademySupportIcon03 from "@assets/images/icon/academy-support-icon-03.svg";
import AcademySupportIcon04 from "@assets/images/icon/academy-support-icon-04.svg";




export default function Careers() {

    // breadcrumbs
    const breadcrumbsItem = [
        { label: "ホーム", to: "/" },
        { label: "教育業務", to: "/career_academy" }

    ]

    return (
        <>
            {/* page title */}
            <section className="w-full mt-32 border-b border-gray-300">
                <div className="lg:w-[75%] mx-auto px-7 lg:px-0 pb-9 page_title">
                    <h1 className="font-semibold">CAREER ACADEMY</h1>
                    <h6 className="font-semibold text-[var(--color-text-secondary)]">教育業務</h6>
                </div>
            </section>
            {/* breadcrumbs */}
            <section>
                <div className="lg:w-[75%] mx-auto px-7 lg:px-0">
                    <Breadcrumbs items={breadcrumbsItem} />
                </div>
            </section>
            {/* body */}
            <section className="flex flex-col lg:flex-row items-start gap-6 p-7 lg:p-12 lg:w-[75%] mx-auto mt-16 lg:mt-36">

                <div className="w-full lg:w-1/2">
                    <div className="w-full rounded-lg">
                        <img
                            src={hgAcademyImg}
                            alt="hg-academy"
                            className="w-full h-auto md:h-full object-cover rounded-lg"
                        />
                    </div>
                </div>

                {/* Text */}
                <div className="w-full lg:w-1/2">
                    <h2 className="font-bold mb-3">
                        HORIZON CAREER ACADEMYとは?
                    </h2>

                    <p className="text-sm md:text-base leading-relaxed mb-4">
                        HORIZON CAREER ACADEMYは、日本で活躍できる人材不足問題の解決を目指し、
                        株式会社HORIZON GROUPが運営する外国人向けの職業交流型スクールです。
                    </p>

                    <p className="text-sm md:text-base leading-relaxed">
                        主に、日本で働きたいと考える外国人を対象としており、安心して暮らし、
                        安定して働けるよう、就職活動及び職場アスリート支援活動に学びと企業を
                        提供しています。カリキュラムは、職種や希望に応じて選択できます。
                        研修・就職準備を包括的に支援するために必要な、以下の内容を含んでいます。
                    </p>
                </div>
            </section>

            {/* Support section */}
            <section className="lg:w-[75%] mx-auto mt-16 lg:mt-24 px-4 md:px-8 py-10 text-center">

                <h4 className="w-full md:w-[50%] mx-auto text-center font-semibold leading-relaxed mb-10">
                    働く準備のみならず、日本社会で
                    <span className="text-sky-500">「活躍できる人材育成」</span>
                    がHORIZON CAREER ACADEMYの使命です。
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-[var(--color-primary)] rounded-full mb-4 flex items-center justify-center">
                            <img src={AcademySupportIcon01} alt="icon" className="w-14 h-14 object-contain" />
                        </div>
                        <span className="font-semibold text-lg text-[var(--color-dark)]">実践的学習</span>
                        <p className="text-sm text-[var(--color-primary)] font-semibold py-2">COURSE</p>
                        <p className="text-sm">就職・転職活動を成功させるために必要な実践的なスキルを習得</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-[var(--color-primary)] rounded-full mb-4 flex items-center justify-center">
                            <img src={AcademySupportIcon02} alt="icon" className="w-14 h-14 object-contain" />
                        </div>
                        <span className="font-semibold text-lg text-[var(--color-dark)]">個別サポート</span>
                        <p className="text-sm text-[var(--color-primary)] font-semibold py-2">COURSE</p>
                        <p className="text-sm">学生一人ひとりの希望やレベルに応じた個別指導</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-[var(--color-primary)] rounded-full mb-4 flex items-center justify-center">
                            <img src={AcademySupportIcon03} alt="icon" className="w-14 h-14 object-contain" />
                        </div>
                        <span className="font-semibold text-lg text-[var(--color-dark)]">特定技能対応</span>
                        <p className="text-sm text-[var(--color-primary)] font-semibold py-2">COURSE</p>
                        <p className="text-sm">特定技能制度に対応した試験対策講座も開講</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-[var(--color-primary)] rounded-full mb-4 flex items-center justify-center">
                            <img src={AcademySupportIcon04} alt="icon" className="w-14 h-14 object-contain" />
                        </div>
                        <span className="font-semibold text-lg text-[var(--color-dark)]">文化理解</span>
                        <p className="text-sm text-[var(--color-primary)] font-semibold py-2">COURSE</p>
                        <p className="text-sm">日本での生活マナー・文化の理解を深める</p>
                    </div>

                </div>
            </section>

            <div className="my-24 px-4 md:px-8">
                <CurriculumSection />
            </div>
        </>

    )
}


