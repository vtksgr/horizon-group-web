import { Link } from "react-router-dom";

import desktopHeroImg from "@assets/images/common/desktop-hero-img.jpg";
import tabletHeroImg from "@assets/images/common/tablet-hero-img.jpg";
import smartphoneHeroImg from "@assets/images/common/smartphone-hero-img.jpg";
import useLocalizedCopy from "../../../../hooks/useLocalizedCopy";
import LatestPost from "./LatestPost";
import "./HeroSection.css";

const copy = {
  ja: {
    tagline: "世界と日本をつなぐチカラ",
    description:
      "成長を志す外国籍の皆様と、世界へ羽ばたく企業様との架け橋となることを目指しております。共に支え、高めあうことができますよう、全身全霊でサポートいたします。",
    companyCta: "企業様へお問い合わせ",
    candidateCta: "求職様へお問い合わせ",
    scroll: "Scroll down",
  },
  en: {
    tagline: "Connecting Japan with the world",
    description:
      "We aim to be a bridge between globally minded international talent and companies that are ready to grow beyond borders. Our team offers wholehearted support so both sides can succeed together.",
    companyCta: "Contact for Companies",
    candidateCta: "Contact for Job Seekers",
    scroll: "Scroll down",
  },
};

export default function HeroSection() {
  const t = useLocalizedCopy(copy);

  return (
    <section className="relative flex h-full min-h-0 flex-col justify-between overflow-hidden px-4 py-4 text-white md:px-10 md:py-6 lg:px-16">
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(min-width: 1024px)" srcSet={desktopHeroImg} />
          <source media="(min-width: 768px)" srcSet={tabletHeroImg} />
          <img
            src={smartphoneHeroImg}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-[rgba(41,59,99,0.6)]" />
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="mt-8 flex flex-col items-center md:mt-16">
          <div className="hero-copy inline-flex flex-col items-start">
            <p className="hero-tagline mb-2 text-left opacity-80 md:mb-2">
              {t.tagline}
            </p>

            <h1 className="hero-title mb-3 text-left font-black text-white md:mb-6">
              HORIZON GROUP
            </h1>
          </div>

          <p className="mx-auto mb-8 w-[96%] text-center text-[12px] leading-6 md:w-[80%] md:text-[20px] md:leading-8 2xl:w-[60%] 2xl:leading-loose">
            {t.description}
          </p>

          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row md:gap-5 2xl:mt-9">
            <Link
              to="/contact_company"
              className="inline-flex min-h-11 items-center justify-center bg-(--color-dark) px-6 py-3 text-xs font-semibold text-white transition-all duration-200 hover:bg-black sm:text-sm md:text-base"
            >
              {t.companyCta}
            </Link>
            <Link
              to="/contact_candidate"
              className="inline-flex min-h-11 items-center justify-center bg-(--color-primary) px-6 py-3 text-xs font-semibold text-white transition-all duration-200 hover:bg-(--color-primary-hover) sm:text-sm md:text-base"
            >
              {t.candidateCta}
            </Link>
          </div>
        </div>
      </div>
{/* latest post  */}
      <LatestPost />
{/* scroll text design */}
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
