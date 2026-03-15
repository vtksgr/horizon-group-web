import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

import desktopHeroImg from "@assets/images/common/desktop-hero-img.jpg";
import tabletHeroImg from "@assets/images/common/tablet-hero-img.jpg";
import smartphoneHeroImg from "@assets/images/common/smartphone-hero-img.jpg";
import useLocalizedCopy from "../../../../hooks/useLocalizedCopy";

const copy = {
  ja: {
    tagline: "世界と日本をつなぐチカラ",
    description:
      "成長を志す外国籍の皆様と、世界へ羽ばたく企業様との架け橋となることを目指しております。共に支え、高めあうことができますよう、全身全霊でサポートいたします。",
    companyCta: "企業様へお問い合わせ",
    candidateCta: "求職様へお問い合わせ",
    newsTag: "お知らせ",
    newsTitle:
      "代表をはじめ、スタッフ全員が日本で学び、働き、生活してきた経験がございます。",
    viewAll: "すべてを見る",
    scroll: "Scroll down",
  },
  en: {
    tagline: "Connecting Japan with the world",
    description:
      "We aim to be a bridge between globally minded international talent and companies that are ready to grow beyond borders. Our team offers wholehearted support so both sides can succeed together.",
    companyCta: "Contact for Companies",
    candidateCta: "Contact for Job Seekers",
    newsTag: "News",
    newsTitle:
      "From our representative onward, every team member has firsthand experience studying, working, and living in Japan.",
    viewAll: "View all",
    scroll: "Scroll down",
  },
};

export default function HeroSection() {
  const t = useLocalizedCopy(copy);

  return (
    <section className="relative flex h-full min-h-0 flex-col justify-between overflow-hidden px-4 py-4 text-white md:px-10 md:py-6 lg:px-16">
      <div className="absolute inset-0 z-0">
        <img src={smartphoneHeroImg} alt="" className="h-full w-full object-cover md:hidden" aria-hidden="true" />
        <img src={tabletHeroImg} alt="" className="hidden h-full w-full object-cover md:block lg:hidden" aria-hidden="true" />
        <img src={desktopHeroImg} alt="" className="hidden h-full w-full object-cover lg:block" aria-hidden="true" />
        <div className="absolute inset-0 bg-[rgba(80,90,110,0.6)]" />
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="mt-8 text-center md:mt-16">
          <p className="mb-2 text-[18px] leading-8 opacity-80 md:mb-2 md:text-[24px] md:leading-none lg:pl-16 lg:text-left lg:text-[24px] xl:text-[32px] 2xl:text-[48px]">
            {t.tagline}
          </p>

          <h1 className="mb-3 text-center text-[40px] font-black leading-none tracking-wide text-white md:mb-6 md:text-[80px] lg:text-[104px] xl:text-[136px] 2xl:text-[184px]">
            HORIZON GROUP
          </h1>

          <p className="mx-auto mb-8 w-[96%] text-center text-[12px] leading-6 md:w-[80%] md:text-[20px] md:leading-8 2xl:w-[60%] 2xl:leading-loose">
            {t.description}
          </p>

          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row md:gap-5 2xl:mt-9">
            <Link
              to="/contact_company"
              className="inline-flex min-h-11 items-center justify-center rounded bg-[#0D0F11] px-6 py-3 text-xs font-semibold text-white transition-all duration-200 hover:bg-black sm:text-sm md:text-base"
            >
              {t.companyCta}
            </Link>
            <Link
              to="/contact_recruit"
              className="inline-flex min-h-11 items-center justify-center rounded bg-[#00B1E6] px-6 py-3 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#0099c7] sm:text-sm md:text-base"
            >
              {t.candidateCta}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-6 hidden w-[90%] flex-col items-center justify-between gap-2 border-t border-neutral-200 bg-white px-4 py-3 text-xs text-[#595D61] md:flex md:flex-row md:px-10 md:text-sm lg:px-16">
        <div className="block min-w-0 flex-1 overflow-x-auto md:flex md:items-center md:gap-3">
          <span className="w-25 text-sm font-bold text-[#0D0F11] md:border-r md:border-gray-300 md:text-base">NEWS</span>
          <span className="text-neutral-400">2025.07.17</span>
          <span className="hidden bg-black px-2 py-0.5 text-[8px] text-white xl:block xl:text-xs">{t.newsTag}</span>
          <p className="ml-2 truncate md:border-l md:border-gray-300 md:pl-4">
            <a
              href="#"
              className="bg-[linear-gradient(#00B1E6,#00B1E6)] bg-[length:0%_1px] bg-[center_bottom] bg-no-repeat text-[10px] text-[#595D61] transition-all duration-300 ease-in-out hover:bg-[length:100%_1px] hover:text-[#0D0F11] lg:text-sm"
            >
              {t.newsTitle}
            </a>
          </p>
        </div>

        <div className="shrink-0 md:border-l md:border-gray-300 md:pl-4">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-[10px] text-[#0080FF] transition-all duration-200 ease-in-out hover:text-[var(--color-primary)] sm:text-xs"
          >
            {t.viewAll} <FaArrowRightLong />
          </a>
        </div>
      </div>

      <div className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 select-none flex-col items-center opacity-60 md:right-5 md:flex">
        <span className="text-[10px] md:text-xs" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
          {t.scroll}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.24 500" className="h-28 w-6 md:h-40" aria-hidden="true">
          <line x1="13.59" y1="21.75" x2="13.59" y2="485.77" fill="none" stroke="#FFF" strokeMiterlimit="10" strokeWidth="2" />
          <polygon
            points="5.41 479.15 6.88 477.78 13.59 485 20.31 477.78 21.77 479.15 13.59 487.94 5.41 479.15"
            fill="#FFF"
          />
        </svg>
      </div>
    </section>
  );
}
