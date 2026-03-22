import { useMemo, useState } from "react";
import Breadcrumbs from "../../../components/ui/breadcrumbs/Breadcrumbs";
import useLocalizedCopy from "../../../hooks/useLocalizedCopy";

const faqCopy = {
  ja: {
    crumbs: { home: "ホーム", faq: "よくあるご質問" },
    subtitle: "よくあるご質問",
    categoryTitle: "よくあるご質問内容",
    empty: "質問はまだありません。",
    categories: [
      {
        id: "visa",
        title: "ビザ・在留資格について",
        faqs: [
          {
            q: "日本語学校の留学生でも就労ビザを申請できますか？",
            a: "はい、可能です。ただし、原則で短期大学または大学を卒業されていることが条件となります。",
          },
          {
            q: "就職が決まらない場合、帰国するしかないのでしょうか？",
            a: "はい、方法はございます。状況に応じて対応策が異なりますので、ぜひ弊社までご相談ください。",
          },
          {
            q: "留学ビザから就労ビザに変更するタイミングはいつが良いですか？",
            a: "内定が決まり、雇用契約書が準備できた段階で申請を開始するのが一般的です。",
          },
        ],
      },
      {
        id: "job-support",
        title: "就業活動の進め方・サポート",
        faqs: [
          {
            q: "就職活動はいつから始めればよいでしょうか？",
            a: "登録から内定までは通常1〜3ヶ月、入社まではさらに1〜3ヶ月程度かかることがあります。",
          },
          {
            q: "エージェントとの面談は必須でしょうか？",
            a: "はい、初回面談は必須です。オンラインで約1時間ほどお時間をいただいています。",
          },
          {
            q: "平日終業後や土日の面談も可能でしょうか？",
            a: "はい、可能です。エントリー後にご希望の日時をご相談ください。",
          },
        ],
      },
      {
        id: "resume",
        title: "日本語面接・履歴書について",
        faqs: [
          {
            q: "日本語能力試験（JLPT）はどのレベルが必要ですか？",
            a: "職種によりますが、N2以上が望ましいです。業種によってはN3〜N4でも可能な場合があります。",
          },
          {
            q: "履歴書の内容に自信がありません。サポートはありますか？",
            a: "はい、履歴書の添削を行っています。職種に合わせたアピールの組み立てをサポートします。",
          },
          {
            q: "面接に自信がありません。サポートはありますか？",
            a: "はい、模擬面接を含む面接練習を実施しています。",
          },
        ],
      },
      {
        id: "life",
        title: "生活サポートについて",
        faqs: [
          {
            q: "家探しや住民登録などの生活面のサポートもありますか？",
            a: "はい、不動産会社との提携や生活支援も一部行っています。",
          },
          {
            q: "問い合わせ時に対応できる外国人スタッフはいますか？",
            a: "はい、多言語対応可能なスタッフが在籍しております。",
          },
          {
            q: "パソコンを持っていなくても問題ありませんか？",
            a: "はい、問題ありません。スマートフォンでも進められるよう支援します。",
          },
        ],
      },
    ],
  },
  en: {
    crumbs: { home: "Home", faq: "FAQ" },
    subtitle: "Frequently Asked Questions",
    categoryTitle: "FAQ Categories",
    empty: "No questions available yet.",
    categories: [
      {
        id: "visa",
        title: "Visa and Residence Status",
        faqs: [
          {
            q: "Can language-school students apply for a work visa?",
            a: "Yes. In principle, graduating from a junior college or university is required.",
          },
          {
            q: "If I cannot find a job, do I have to return home?",
            a: "Not necessarily. Available options depend on your situation, so please consult us directly.",
          },
          {
            q: "When should I switch from a student visa to a work visa?",
            a: "Usually after receiving an offer and preparing your employment contract documents.",
          },
        ],
      },
      {
        id: "job-support",
        title: "Job Search Process and Support",
        faqs: [
          {
            q: "When should I start job hunting?",
            a: "Typically, it takes 1 to 3 months from registration to an offer, and another 1 to 3 months until joining.",
          },
          {
            q: "Is an interview with your agent required?",
            a: "Yes, the first consultation is required and usually takes around one hour online.",
          },
          {
            q: "Can I schedule interviews after work or on weekends?",
            a: "Yes. We will coordinate your preferred date and time after your entry.",
          },
        ],
      },
      {
        id: "resume",
        title: "Interviews and Resume Support",
        faqs: [
          {
            q: "What JLPT level is needed?",
            a: "It depends on the role, but N2 or above is preferred. Some jobs accept N3-N4.",
          },
          {
            q: "Can you help improve my resume?",
            a: "Yes. We provide resume reviews and guidance tailored to your target role.",
          },
          {
            q: "I am not confident in interviews. Can you help?",
            a: "Yes. We provide mock interviews and interview training.",
          },
        ],
      },
      {
        id: "life",
        title: "Daily Life Support",
        faqs: [
          {
            q: "Do you support housing and local registration procedures?",
            a: "Yes. We provide selected life support services in partnership with real estate agencies.",
          },
          {
            q: "Are multilingual staff members available?",
            a: "Yes. Multilingual staff are available for support.",
          },
          {
            q: "Can I continue the process without a PC?",
            a: "Yes. We also support applicants who mainly use smartphones.",
          },
        ],
      },
    ],
  },
};

export default function FAQ() {
  const t = useLocalizedCopy(faqCopy);
  const [activeId, setActiveId] = useState(t.categories[0]?.id || "");

  const activeFaqs = useMemo(() => {
    return t.categories.find((c) => c.id === activeId)?.faqs ?? [];
  }, [activeId, t.categories]);

  const breadcrumbItems = [
    { label: t.crumbs.home, to: "/" },
    { label: t.crumbs.faq, to: "/faq" },
  ];

  return (
    <>
      <section className="w-full mt-32 border-b border-gray-300">
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0 pb-9 page_title">
          <h1 className="font-semibold">FAQ</h1>
          <h6 className="font-semibold text-[var(--color-text-secondary)]">{t.subtitle}</h6>
        </div>
      </section>

      <section>
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </section>

      <section className="xl:w-[75%] my-16 lg:my-24 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 xl:px-0">
        <aside className="lg:col-span-4">
          <nav className="bg-[#F6F7F8] pb-16 px-3">
            <h5 className="font-bold mb-4 pb-4 px-3 pt-4 border-b border-gray-300 border-solid">{t.categoryTitle}</h5>
            <ul className="space-y-2">
              {t.categories.map((cat, idx) => {
                const isActive = activeId === cat.id;

                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      className={[
                        "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] hover:bg-white/70",
                        isActive ? "bg-white shadow-sm ring-1 ring-black/5" : "",
                      ].join(" ")}
                      onClick={() => setActiveId(cat.id)}
                    >
                      <span
                        className={[
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-semibold",
                          isActive ? "bg-[var(--color-primary)] text-white" : "bg-gray-200 text-(--text-color)",
                        ].join(" ")}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-sm font-medium text-(--text-color)">{cat.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <aside className="lg:col-span-8 px-2 lg:px-0">
          <div className="space-y-8">
            {activeFaqs.map((item) => (
              <div key={item.q} className="border-b border-gray-200 pb-6">
                <p className="font-bold mb-2">
                  <span className="text-[var(--color-primary)] text-sm mr-2">Q.</span>
                  {item.q}
                </p>
                <p className="text-sm whitespace-pre-line">
                  <span className="font-semibold mr-2 text-(--text-color)">A.</span>
                  {item.a}
                </p>
              </div>
            ))}
            {activeFaqs.length === 0 ? <p className="text-(--text-color)">{t.empty}</p> : null}
          </div>
        </aside>
      </section>
    </>
  );
}
