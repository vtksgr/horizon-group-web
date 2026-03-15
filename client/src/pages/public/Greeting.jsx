import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Breadcrumbs from "../../components/ui/breadcrumbs/Breadcrumbs";
import useLocalizedCopy from "../../hooks/useLocalizedCopy";

const greetingCopy = {
  ja: {
    crumbs: { home: "ホーム", greeting: "ご挨拶" },
    subtitle: "ご挨拶",
    lead: "成長を志す外国籍の皆様と、世界へ羽ばたく企業様をつなぐ架け橋を目指しております",
    paragraphs: [
      "この度は、多くの外国人人材紹介会社の中から、株式会社HORIZON GROUPに関心をお寄せいただき、心より感謝申し上げます。",
      "2017年、私はネパールにて大学を卒業した後に日本への留学の道を選びました。最初は日本語学校で、ゼロからの日本語学習に励み、その後、専門学校で高度な技術と専門知識を学びました。学業に励みながら、アルバイトを通じて日本の職場文化を肌で感じ、やがて日本企業に就職しました。以来8年間、外資系企業の外国人エンジニアとして勤めました。",
      "この経験を通じて、日本の素晴らしい職場文化と、同時に外国人労働者が直面する数々の課題を肌で感じました。言葉の壁、文化の違い、キャリア構築の難しさ。私自身が乗り越えてきたこれらの課題は、日本が必要とする優秀な外国人材を支援したいという強い想いに駆られました。",
      "そこで、日本が直面する人材不足の課題に真正面から向き合うため、HORIZON GROUPを立ち上げました。私たちは、海外から優秀な人材を日本の企業にお繋ぎし、双方にとって価値ある出会いを創造することを目指しています。",
      "私たちは、単なる人材紹介にとどまりません。日本への留学を希望される方への日本語教育から、留学支援、生活支援、ビザ取得サポート、就労後のフォローまで、一人ひとりに寄り添った長期的かつ総合的なサポートを提供しています。",
      "日本の学校関係者様、企業の皆様に安心して外国人の皆様を迎え入れていただき、同時に外国人の皆様が日本で活躍できる環境を整えることが私たちの使命です。",
      "言語や文化の壁を越えて、お互いの可能性を広げる。そんな想いを胸に、HORIZON GROUPは誠実にチャレンジし続けます。",
    ],
    title: "株式会社HORIZON GROUP",
    name: "代表取締役 ダンギ・ティラク",
  },
  en: {
    crumbs: { home: "Home", greeting: "Greeting" },
    subtitle: "Greeting",
    lead: "We strive to be a trusted bridge between globally minded international talent and companies aiming to expand worldwide.",
    paragraphs: [
      "Thank you for your interest in HORIZON GROUP among many global recruitment agencies.",
      "In 2017, after graduating from university in Nepal, I chose to study in Japan. I started learning Japanese from scratch at a language school, then studied advanced skills and specialized knowledge at a vocational school. While studying, I experienced Japanese workplace culture through part-time work and later joined a Japanese company. I then worked for eight years as a foreign engineer at an international company.",
      "Through this journey, I experienced both the strengths of Japanese workplace culture and the real challenges foreign workers face: language barriers, cultural differences, and career-building difficulties. Overcoming these challenges inspired me to support talented people needed by Japan.",
      "To address Japan's labor shortage directly, I launched HORIZON GROUP. Our goal is to connect talented professionals from overseas with Japanese companies and create valuable opportunities for both sides.",
      "We do more than recruitment. From Japanese-language learning, study support, and life support in Japan to visa assistance and post-employment follow-up, we provide long-term, comprehensive support tailored to each person.",
      "Our mission is to help schools and companies in Japan welcome international talent with confidence while creating an environment where they can thrive.",
      "By crossing language and cultural boundaries and expanding mutual possibilities, HORIZON GROUP will continue taking sincere and meaningful challenges.",
    ],
    title: "HORIZON GROUP Co., Ltd.",
    name: "Representative Director, Tirak Dangi",
  },
};

export default function Greeting() {
  const t = useLocalizedCopy(greetingCopy);

  const breadcrumbItems = [
    { label: t.crumbs.home, to: "/" },
    { label: t.crumbs.greeting, to: "/greeting" },
  ];

  return (
    <>
      <section className="w-full mt-32 border-b border-gray-300">
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0 pb-9 page_title">
          <h1 className="font-semibold">GREETINGS</h1>
          <h6 className="font-semibold text-[var(--color-text-secondary)]">{t.subtitle}</h6>
        </div>
      </section>

      <section>
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </section>

      <section className="lg:w-[75%] mx-auto px-7 lg:px-16 mt-16 mb-28">
        <h3 className="text-center font-semibold pb-8">{t.subtitle}</h3>

        <div className="flex justify-center items-start pb-4">
          <span className="relative pt-1 text-sm lg:text-base pr-2">
            <FaQuoteLeft />
          </span>
          <h5 className="pb-6 font-semibold">{t.lead}</h5>
          <span className="relative pt-1 pl-2 text-sm lg:text-base">
            <FaQuoteRight />
          </span>
        </div>

        {t.paragraphs.map((paragraph) => (
          <p key={paragraph} className="pb-4 text-sm lg:text-base">
            {paragraph}
          </p>
        ))}

        <h4 className="pt-6 font-bold text-right">{t.title}</h4>
        <p className="pt-2 font-bold text-right">{t.name}</p>
      </section>
    </>
  );
}
