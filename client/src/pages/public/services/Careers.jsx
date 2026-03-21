import Breadcrumbs from "../../../components/ui/breadcrumbs/Breadcrumbs";
import CurriculumSection from "../home/sections/CurriculumSection";

import hgAcademyImg from "@assets/images/common/hgAcademyImg.jpg";
import AcademySupportIcon01 from "@assets/images/icon/academy-support-icon-01.svg";
import AcademySupportIcon02 from "@assets/images/icon/academy-support-icon-02.svg";
import AcademySupportIcon03 from "@assets/images/icon/academy-support-icon-03.svg";
import AcademySupportIcon04 from "@assets/images/icon/academy-support-icon-04.svg";
import useLocalizedCopy from "../../../hooks/useLocalizedCopy";

const careersCopy = {
  ja: {
    breadcrumbs: { home: "ホーム", education: "教育業務" },
    subtitle: "教育業務",
    introTitle: "HORIZON CAREER ACADEMYとは?",
    introP1:
      "HORIZON CAREER ACADEMYは、日本で活躍できる人材不足問題の解決を目指し、株式会社HORIZON GROUPが運営する外国人向けの職業交流型スクールです。",
    introP2:
      "主に、日本で働きたいと考える外国人を対象としており、安心して暮らし、安定して働けるよう、就職活動及び職場アスリート支援活動に学びと企業を提供しています。カリキュラムは、職種や希望に応じて選択できます。研修・就職準備を包括的に支援するために必要な、以下の内容を含んでいます。",
    missionPrefix: "働く準備のみならず、日本社会で",
    missionHighlight: "「活躍できる人材育成」",
    missionSuffix: "がHORIZON CAREER ACADEMYの使命です。",
    cards: [
      {
        title: "実践的学習",
        desc: "就職・転職活動を成功させるために必要な実践的なスキルを習得",
      },
      {
        title: "個別サポート",
        desc: "学生一人ひとりの希望やレベルに応じた個別指導",
      },
      {
        title: "特定技能対応",
        desc: "特定技能制度に対応した試験対策講座も開講",
      },
      {
        title: "文化理解",
        desc: "日本での生活マナー・文化の理解を深める",
      },
    ],
  },
  en: {
    breadcrumbs: { home: "Home", education: "Education" },
    subtitle: "Education",
    introTitle: "What Is HORIZON CAREER ACADEMY?",
    introP1:
      "HORIZON CAREER ACADEMY is a career-oriented school for international learners, operated by HORIZON GROUP to help solve Japan's workforce shortage through practical talent development.",
    introP2:
      "The program is designed mainly for people who want to work in Japan. We support stable living and employment through job-search coaching and workplace support programs. Learners can choose curricula based on their preferred industry and career goals.",
    missionPrefix: "Beyond preparing people for work,",
    missionHighlight: 'our mission is to develop "career-ready talent"',
    missionSuffix: "for Japanese society.",
    cards: [
      {
        title: "Practical Training",
        desc: "Build practical skills needed to succeed in job hunting and career changes.",
      },
      {
        title: "Personal Support",
        desc: "One-on-one guidance tailored to each learner's goals and skill level.",
      },
      {
        title: "Specified Skilled Worker Track",
        desc: "Preparation courses are available for specified skilled worker exams.",
      },
      {
        title: "Cultural Understanding",
        desc: "Deepen understanding of daily life manners and culture in Japan.",
      },
    ],
  },
};

export default function Careers() {
  const t = useLocalizedCopy(careersCopy);

  const breadcrumbsItem = [
    { label: t.breadcrumbs.home, to: "/" },
    { label: t.breadcrumbs.education, to: "/career_academy" },
  ];

  return (
    <>
      <section className="w-full mt-32 border-b border-gray-300">
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0 pb-9 page_title">
          <h1 className="font-semibold">CAREER ACADEMY</h1>
          <h6 className="font-semibold text-[var(--color-text-secondary)]">{t.subtitle}</h6>
        </div>
      </section>

      <section>
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0">
          <Breadcrumbs items={breadcrumbsItem} />
        </div>
      </section>

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

        <div className="w-full lg:w-1/2">
          <h2 className="font-bold mb-3">{t.introTitle}</h2>

          <p className="text-sm md:text-base leading-relaxed mb-4">{t.introP1}</p>

          <p className="text-sm md:text-base leading-relaxed">{t.introP2}</p>
        </div>
      </section>

      <section className="lg:w-[75%] mx-auto mt-16 lg:mt-24 px-4 md:px-8 py-10 text-center">
        <h4 className="w-full md:w-[50%] mx-auto text-center font-semibold leading-relaxed mb-10">
          {t.missionPrefix}
          <span className="text-sky-500">{t.missionHighlight}</span>
          {t.missionSuffix}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-[var(--color-primary)] rounded-full mb-4 flex items-center justify-center">
              <img src={AcademySupportIcon01} alt="icon" className="w-14 h-14 object-contain" />
            </div>
            <span className="font-semibold text-lg text-[var(--color-dark)]">{t.cards[0].title}</span>
            <p className="text-sm text-[var(--color-primary)] font-semibold py-2">COURSE</p>
            <p className="text-sm">{t.cards[0].desc}</p>
          </div>

          <div className="bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-[var(--color-primary)] rounded-full mb-4 flex items-center justify-center">
              <img src={AcademySupportIcon02} alt="icon" className="w-14 h-14 object-contain" />
            </div>
            <span className="font-semibold text-lg text-[var(--color-dark)]">{t.cards[1].title}</span>
            <p className="text-sm text-[var(--color-primary)] font-semibold py-2">COURSE</p>
            <p className="text-sm">{t.cards[1].desc}</p>
          </div>

          <div className="bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-[var(--color-primary)] rounded-full mb-4 flex items-center justify-center">
              <img src={AcademySupportIcon03} alt="icon" className="w-14 h-14 object-contain" />
            </div>
            <span className="font-semibold text-lg text-[var(--color-dark)]">{t.cards[2].title}</span>
            <p className="text-sm text-[var(--color-primary)] font-semibold py-2">COURSE</p>
            <p className="text-sm">{t.cards[2].desc}</p>
          </div>

          <div className="bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-[var(--color-primary)] rounded-full mb-4 flex items-center justify-center">
              <img src={AcademySupportIcon04} alt="icon" className="w-14 h-14 object-contain" />
            </div>
            <span className="font-semibold text-lg text-[var(--color-dark)]">{t.cards[3].title}</span>
            <p className="text-sm text-[var(--color-primary)] font-semibold py-2">COURSE</p>
            <p className="text-sm">{t.cards[3].desc}</p>
          </div>
        </div>
      </section>

      <div className="my-24 px-4 md:px-8">
        <CurriculumSection />
      </div>
    </>
  );
}
