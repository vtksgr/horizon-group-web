import {
  FaUserTie,
  FaGlobeAsia,
  FaHandshake,
  FaPassport,
  FaHome,
  FaIndustry,
} from "react-icons/fa";
import useLocalizedCopy from "../../../../hooks/useLocalizedCopy";

const copy = {
  ja: {
    subtitle: "ホライゾングループの強み",
    strengths: [
      {
        title: "外国人職の支援ができる 実績経験に基づくサポート",
        description:
          "弊社の代表をはじめ、スタッフ全員が日本で留学、就職してきた経験と実績に基づく支援。外国人労働者の実情に寄り添ったサポートに力を入れ、充実した就職活動を実現するよう、広くサポートいたします。",
      },
      {
        title: "各国からの留学に関する相談対応",
        description:
          "ネパール語をはじめ、外国語（ヒンディー語・タガログ語・英語・日本語）に対応できる人材がおります。日本への留学に向けた各国の語学スクールと提携し、留学のサポートを行っております。",
      },
      {
        title: "求職者と企業、双方に丁寧で迅速なマッチング",
        description:
          "求職者様への仕事紹介だけでなく、就労前の各種手続きやご相談、さらに就労後のフォローアップに至るまで、一貫して丁寧にサポートいたします。",
      },
      {
        title: "在留資格・ビザ申請も全面的にサポート",
        description:
          "就労ビザ（技人国／特定技能など）の申請支援や、更新・変更手続きのアドバイスも行える体制が整っています。",
      },
      {
        title: "就労後の生活・文化・日本語のフォロー",
        description:
          "外国人材が安心して働き・暮らせるよう、生活面のアドバイスや日本語教育のサポートも行っています。",
      },
      {
        title: "多彩な業界への紹介実績",
        description:
          "製造・サービス業、IT、福祉、流通、その他幅広い業界に対応し、企業様のニーズに合わせた人材提案を行います。",
      },
    ],
  },
  en: {
    subtitle: "HORIZON GROUP Strengths",
    strengths: [
      {
        title: "Support grounded in real foreign-worker experience",
        description:
          "Our team, including leadership, has direct experience studying and working in Japan, enabling practical support tailored to the realities of international job seekers.",
      },
      {
        title: "Study-abroad consultation across multiple countries",
        description:
          "We provide multilingual consultation in Nepali, Hindi, Tagalog, English, and Japanese, and collaborate with language schools abroad to support study-in-Japan plans.",
      },
      {
        title: "Fast and precise matching for both sides",
        description:
          "From job introductions to pre-employment procedures and post-placement follow-up, we provide consistent support for both candidates and employers.",
      },
      {
        title: "Full support for visa and status procedures",
        description:
          "We support applications and updates for work-related statuses, including Engineer/Specialist in Humanities/International Services and Specified Skilled Worker.",
      },
      {
        title: "Post-placement life, language, and culture support",
        description:
          "We help international professionals settle in with practical guidance on daily life and support for Japanese language and workplace adaptation.",
      },
      {
        title: "Proven results across diverse industries",
        description:
          "We support hiring in manufacturing, service, IT, welfare, logistics, and more, with talent recommendations aligned to each company's goals.",
      },
    ],
  },
};

export default function OurStrength() {
  const t = useLocalizedCopy(copy);

  const strengths = [
    { Icon: FaUserTie, ...t.strengths[0] },
    { Icon: FaGlobeAsia, ...t.strengths[1] },
    { Icon: FaHandshake, ...t.strengths[2] },
    { Icon: FaPassport, ...t.strengths[3] },
    { Icon: FaHome, ...t.strengths[4] },
    { Icon: FaIndustry, ...t.strengths[5] },
  ];

  return (
    <section className="min-h-screen bg-[#E0E3E6] pt-[80px] pb-16 md:pb-24 lg:pb-32">
      <div className="w-full xl:w-[75%] px-4 sm:px-6 lg:px-8 xl:px-0 mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-[28px] md:text-4xl font-semibold">OUR STRENGTH</h2>
          <h6 className="text-lg sm:text-[19px] md:text-xl font-medium mt-2">{t.subtitle}</h6>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 lg:gap-8">
          {strengths.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 sm:p-6 flex flex-col items-start gap-3 sm:gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded bg-[var(--color-primary)]/20">
                <item.Icon size={32} className="text-[var(--color-primary)]" />
              </div>

              <span className="text-lg sm:text-[18px] md:text-xl text-(--color-dark) font-semibold">{item.title}</span>

              <p className="text-sm sm:text-[15px] md:text-base text-(--text-color) leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
