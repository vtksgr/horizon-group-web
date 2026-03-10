import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Breadcrumbs from "../../components/ui/breadcrumbs/Breadcrumbs";

export default function Greeting() {
  const breadcrumbItems = [
    { label: "ホーム", to: "/" },
    { label: "ご挨拶", to: "/greeting" },
  ];

  return (
    <>
      <section className="w-full mt-32 border-b border-gray-300">
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0 pb-9 page_title">
          <h1 className="font-semibold">GREETINGS</h1>
          <h6 className="font-semibold text-[var(--color-text-secondary)]">ご挨拶</h6>
        </div>
      </section>

      <section>
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </section>

      <section className="lg:w-[75%] mx-auto px-7 lg:px-16 mt-16 mb-28">
        <h3 className="text-center font-semibold pb-8">ご挨拶</h3>

        <div className="flex justify-center items-start pb-4">
          <span className="relative pt-1 text-sm lg:text-base pr-2">
            <FaQuoteLeft />
          </span>
          <h5 className="pb-6 font-semibold">
            成長を志す外国籍の皆様と、世界へ羽ばたく企業様をつなぐ架け橋を目指しております
          </h5>
          <span className="relative pt-1 pl-2 text-sm lg:text-base">
            <FaQuoteRight />
          </span>
        </div>

        <p className="pb-4 text-sm lg:text-base">
          この度は、多くの外国人人材紹介会社の中から、株式会社HORIZON
          GROUPに関心をお寄せいただき、心より感謝申し上げます。
        </p>
        <p className="pb-4 text-sm lg:text-base">
          2017年、私はネパールにて大学を卒業した後に日本への留学の道を選びました。最初は日本語学校で、ゼロからの日本語学習に励み、その後、専門学校で高度な技術と専門知識を学びました。学業に励みながら、アルバイトを通じて日本の職場文化を肌で感じ、やがて日本企業に就職しました。以来8年間、外資系企業の外国人エンジニアとして勤めました。
        </p>
        <p className="pb-4 text-sm lg:text-base">
          この経験を通じて、日本の素晴らしい職場文化と、同時に外国人労働者が直面する数々の課題を肌で感じました。言葉の壁、文化の違い、キャリア構築の難しさ。私自身が乗り越えてきたこれらの課題は、日本が必要とする優秀な外国人材を支援したいという強い想いに駆られました。
        </p>
        <p className="pb-4 text-sm lg:text-base">
          そこで、日本が直面する人材不足の課題に真正面から向き合うため、HORIZON
          GROUPを立ち上げました。私たちは、海外から優秀な人材を日本の企業にお繋ぎし、双方にとって価値ある出会いを創造することを目指しています。
        </p>
        <p className="pb-4 text-sm lg:text-base">
          私たちは、単なる人材紹介にとどまりません。日本への留学を希望される方への日本語教育から、留学支援、生活支援、ビザ取得サポート、就労後のフォローまで、一人ひとりに寄り添った長期的かつ総合的なサポートを提供しています。
        </p>
        <p className="pb-4 text-sm lg:text-base">
          日本の学校関係者様、企業の皆様に安心して外国人の皆様を迎え入れていただき、同時に外国人の皆様が日本で活躍できる環境を整えることが私たちの使命です。
        </p>
        <p className="pb-4 text-sm lg:text-base">
          言語や文化の壁を越えて、お互いの可能性を広げる。そんな想いを胸に、HORIZON
          GROUPは誠実にチャレンジし続けます。
        </p>

        <h4 className="pt-6 font-bold text-right">株式会社HORIZON GROUP</h4>
        <p className="pt-2 font-bold text-right">代表取締役 ダンギ・ティラク</p>
      </section>
    </>
  );
}
