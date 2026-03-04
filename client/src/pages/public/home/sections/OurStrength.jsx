import {
    FaUserTie,
    FaGlobeAsia,
    FaHandshake,
    FaPassport,
    FaHome,
    FaIndustry,
} from "react-icons/fa";

export default function OurStrength() {
    const strengths = [
        {
            Icon: FaUserTie,
            title: "外国人職の支援ができる 実績経験に基づくサポート",
            description:
                "弊社の代表をはじめ、スタッフ全員が日本で留学、就職してきた経験と実績に基づく支援。外国人労働者の実情に寄り添ったサポートに力を入れ、充実した就職活動を実現するよう、広くサポートいたします。",
        },
        {
            Icon: FaGlobeAsia,
            title: "各国からの留学に関する相談対応",
            description:
                "ネパール語をはじめ、外国語（ヒンディー語・タガログ語・英語・日本語）に対応できる人材がおります。日本への留学に向けた各国の語学スクールと提携し、留学のサポートを行っております。",
        },
        {
            Icon: FaHandshake,
            title: "求職者と企業、双方に丁寧で迅速なマッチング",
            description:
                "求職者様への仕事紹介だけでなく、就労前の各種手続きやご相談、さらに就労後のフォローアップに至るまで、一貫して丁寧にサポートいたします。",
        },
        {
            Icon: FaPassport,
            title: "在留資格・ビザ申請も全面的にサポート",
            description:
                "就労ビザ（技人国／特定技能など）の申請支援や、更新・変更手続きのアドバイスも行える体制が整っています。",
        },
        {
            Icon: FaHome,
            title: "就労後の生活・文化・日本語のフォロー",
            description:
                "外国人材が安心して働き・暮らせるよう、生活面のアドバイスや日本語教育のサポートも行っています。",
        },
        {
            Icon: FaIndustry,
            title: "多彩な業界への紹介実績",
            description:
                "製造・サービス業、IT、福祉、流通、その他幅広い業界に対応し、企業様のニーズに合わせた人材提案を行います。",
        },
    ];

    return (
        <section className="min-h-screen bg-[#E0E3E6] pt-[80px] pb-16 md:pb-24 lg:pb-32">
            <div className="w-full xl:w-[75%] px-4 sm:px-6 lg:px-8 xl:px-0 mx-auto">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h2
                        className="text-2xl sm:text-[28px] md:text-4xl font-semibold"
                    >
                        OUR STRENGTH
                    </h2>

                    <h6 className="text-lg sm:text-[19px] md:text-xl font-medium mt-2">
                        ホライゾングループの強み
                    </h6>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 lg:gap-8">
                    {strengths.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md p-5 sm:p-6 flex flex-col items-start gap-3 sm:gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded bg-[var(--color-primary)]/20">
                                <item.Icon size={32} className="text-[var(--color-primary)]" />
                            </div>

                            <span className="text-lg sm:text-[18px] md:text-xl text-[#0d0f11] font-semibold">
                                {item.title}
                            </span>

                            <p className="text-sm sm:text-[15px] md:text-base text-gray-600 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
