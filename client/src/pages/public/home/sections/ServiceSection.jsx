import { FaCheck } from "react-icons/fa6";
import { BsFillBuildingsFill, BsPeopleFill, BsTranslate } from "react-icons/bs";
import { FaLaptopCode, FaGraduationCap } from "react-icons/fa";

import hbBuilding from "@assets/images/common/hb-building-img.jpg";
import hbBusiness from "@assets/images/common/hb-business-img.jpg";
import hbStudent from "@assets/images/common/hb-student.jpg";
import hbTranslation from "@assets/images/common/hg-translation.jpg";
import webDevelopment from "@assets/images/common/web-development.jpg";
import useLocalizedCopy from "../../../../hooks/useLocalizedCopy";

const copy = {
  ja: {
    subtitle: "当社サービス",
    sections: [
      {
        title: "人材紹介サービス",
        desc: "日本で働きたい外国人と、優秀な人材を求める企業をつなぎます。採用前後を一貫してサポートします。",
        image: hbBuilding,
        icon: BsFillBuildingsFill,
        heading: "FOR COMPANY 企業様向け",
        bullets: [
          "採用ニーズに合った外国籍人材のご紹介",
          "採用手続き・面接対応の支援",
          "就労ビザ取得・変更手続きのサポート",
        ],
      },
      {
        title: "求職者向けサポート",
        desc: "外国籍求職者が安心して就職できるよう、応募から入社まで丁寧に支援します。",
        image: hbBusiness,
        icon: BsPeopleFill,
        heading: "FOR JOB SEEKERS 求職者様向け",
        bullets: [
          "外国人採用に積極的な企業の紹介",
          "応募・面接準備のアドバイス",
          "入社後フォローアップ",
        ],
      },
      {
        title: "留学生サポートサービス",
        desc: "学校選びから入学、生活支援、就職支援までトータルでサポートします。",
        image: hbStudent,
        icon: FaGraduationCap,
        heading: "FOR STUDENT 提供サービス",
        bullets: [
          "日本語学校・専門学校・大学の紹介",
          "学生ビザ申請と更新支援",
          "来日後の生活支援と進路相談",
        ],
      },
      {
        title: "翻訳・通訳サービス",
        desc: "ビジネス、教育、医療など多様な場面で高品質な言語サポートを提供します。",
        image: hbTranslation,
        icon: BsTranslate,
        heading: "LANGUAGE SUPPORT 対応言語",
        bullets: ["日本語・英語・ネパール語など多言語対応", "会議通訳、文書翻訳、WEBコンテンツ翻訳", "業務用途に合わせた専門対応"],
      },
      {
        title: "WEB制作・デザインサービス",
        desc: "Webサイト制作からデザイン制作まで、オンライン発信を包括的に支援します。",
        image: webDevelopment,
        icon: FaLaptopCode,
        heading: "DIGITAL & DESIGN SUPPORT 提供サービス",
        bullets: [
          "Webサイト・Webアプリ制作",
          "ECサイト構築と運用支援",
          "パンフレット・名刺などのデザイン制作",
        ],
      },
    ],
  },
  en: {
    subtitle: "Our Services",
    sections: [
      {
        title: "Recruitment Services",
        desc: "We connect international talent who want to work in Japan with companies seeking skilled professionals, and support the process end-to-end.",
        image: hbBuilding,
        icon: BsFillBuildingsFill,
        heading: "FOR COMPANY",
        bullets: [
          "Candidate matching based on your hiring needs",
          "Support for hiring process and interviews",
          "Work visa application and status-change support",
        ],
      },
      {
        title: "Support for Job Seekers",
        desc: "We provide practical guidance from application to onboarding so international job seekers can work in Japan with confidence.",
        image: hbBusiness,
        icon: BsPeopleFill,
        heading: "FOR JOB SEEKERS",
        bullets: [
          "Access to companies actively hiring international talent",
          "Application and interview preparation support",
          "Post-placement follow-up",
        ],
      },
      {
        title: "International Student Support",
        desc: "We provide total support from school selection and admission to life support and career planning in Japan.",
        image: hbStudent,
        icon: FaGraduationCap,
        heading: "FOR STUDENTS",
        bullets: [
          "Introduction to language schools, colleges, and universities",
          "Student visa application and renewal support",
          "Life support and career consultation after arrival",
        ],
      },
      {
        title: "Translation and Interpretation",
        desc: "We provide high-quality language support for business, education, healthcare, and more.",
        image: hbTranslation,
        icon: BsTranslate,
        heading: "LANGUAGE SUPPORT",
        bullets: [
          "Multilingual coverage including Japanese, English, and Nepali",
          "Interpretation for meetings and on-site communication",
          "Translation for documents and web content",
        ],
      },
      {
        title: "Web Production and Design",
        desc: "From websites to digital design, we help improve your online presence and business communication.",
        image: webDevelopment,
        icon: FaLaptopCode,
        heading: "DIGITAL & DESIGN SUPPORT",
        bullets: [
          "Website and web application development",
          "E-commerce site setup and support",
          "Design production for brochures and business cards",
        ],
      },
    ],
  },
};

function ServiceCard({ section }) {
  return (
    <div className="mt-10">
      <div className="mb-6">
        <h4 className="border-l-4 border-[var(--color-primary)] pl-4">{section.title}</h4>
        <p className="md:pl-6">{section.desc}</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-stretch border border-gray-300 rounded-lg shadow-sm">
        <div className="md:w-5/12 p-4 md:flex">
          <div className="overflow-hidden rounded-xl shadow-md md:flex-1">
            <img src={section.image} alt={section.title} className="w-full h-56 sm:h-72 md:h-full object-cover" />
          </div>
        </div>

        <div className="md:w-7/12 p-6">
          <h4 className="font-semibold pb-2 flex items-start gap-2 border-b border-gray-300">
            <span className="p-2 bg-blue-200 rounded">
              <section.icon className="text-[var(--color-primary)] text-lg" />
            </span>
            {section.heading}
          </h4>

          <ul className="space-y-2 mt-4">
            {section.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span className="mt-1 shrink-0">
                  <FaCheck className="text-[var(--color-primary)]" />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ServiceSection() {
  const t = useLocalizedCopy(copy);

  return (
    <section className="w-full xl:w-[75%] px-4 sm:px-6 lg:px-8 xl:px-0 mx-auto">
      <div className="text-center">
        <h2 className="font-bold mb-2 sec-title">SERVICE</h2>
        <h6 className="text-base md:text-lg font-medium mb-8">{t.subtitle}</h6>
      </div>

      {t.sections.map((section) => (
        <ServiceCard key={section.title} section={section} />
      ))}
    </section>
  );
}
