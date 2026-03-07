import { useMemo, useState } from "react";
import Breadcrumbs from "../../components/ui/breadcrumbs/Breadcrumbs";

const BREADCRUMB_ITEMS = [
  { label: "ホーム", to: "/" },
  { label: "よくあるご質問", to: "/faq" },
];

const CATEGORIES = [
  {
    id: "visa",
    title: "ビザ・在留資格について",
    faqs: [
      {
        q: "日本語学校の留学生でも就労ビザを申請できますか？",
        a: "はい、可能です。ただし、原則で短期大学または大学を卒業されていることが条件となります。",
      },
      {
        q: "就職が決まらない場合、帰国するしかないのでしょうか？何か救済方法はありますか？",
        a: "はい、方法はございます。状況に応じて対応策が異なりますので、ぜひ弊社までご相談ください。",
      },
      {
        q: "留学ビザから就労ビザに変更するタイミングはいつが良いですか？",
        a: "内定が決まり、雇用契約書が準備できた段階で申請を開始するのが一般的です。弊社が申請準備もサポートいたします。",
      },
      {
        q: "特定技能ビザを持っていても転職はできますか？",
        a: "はい、同じ業種内であれば転職可能です。ただし、入管への手続きが必要になります。",
      },
    ],
  },
  {
    id: "job-support",
    title: "就業活動の進め方・サポート",
    faqs: [
      {
        q: "就職活動はいつから始めればよいでしょうか？",
        a: "一般的な流れは「エントリー → 面談 → 応募 → 書類選考 → 面接（1～3回）→ 内定 → 入社」です。登録から内定までは通常1～3ヶ月、入社まではさらに1～3ヶ月程度かかることがあります。",
      },
      {
        q: "エージェントとの面談は必須でしょうか？",
        a: "はい、初回面談は必須です。\nご経験やご希望をしっかり伺うため、基本的にはオンラインで約1時間ほどお時間を頂いております。",
      },
      {
        q: "面談方法にはどのようなものがありますか？",
        a: "オンライン（Google Meet、Zoomなど）、お電話、または対面での面談が可能です。ご希望に応じて対応いたします。",
      },
      {
        q: "平日終業後や土日の面談も可能でしょうか？",
        a: "はい、可能です。エントリー後にご希望の日時をお伺いしますので、その際にご相談ください。",
      },
    ],
  },
  {
    id: "process",
    title: "日本語面接・履歴書・面談について",
    faqs: [
      {
        q: "日本語能力試験（JLPT）はどのレベルが必要ですか？",
        a: "職種によりますが、N2以上が望ましいです。\n製造業などではN3～N4レベルでも働ける場合があります。",
      },
      {
        q: "履歴書の内容に自信がありません。サポートはありますか？",
        a: "はい、履歴書の添削を行っています。\n年間500通以上の応募書類を見ているコンサルタントがサポートします。",
      },
      {
        q: "面接に自信がありません。サポートはありますか？",
        a: "はい、模擬面接を含む面接練習を行っております。\n安心してご参加ください。",
      },
      {
        q: "日本の履歴書の書き方がわかりません。",
        a: "日本独自の履歴書フォーマットの作成方法も丁寧にサポートいたします。",
      },
    ],
  },
  {
    id: "life",
    title: "模試・事務・寮・生活サポートについて",
    faqs: [
      {
        q: "エントリー時に必要なものはありますか？",
        a: "必須ではありませんが、履歴書をお持ちであればアップロードまたはメールでの送付をお願いします。",
      },
      {
        q: "パソコンを持っていなくても問題ありませんか？",
        a: "はい、問題ありません。\nGoogleドキュメントなどを使いながら、スマートフォンでも対応できるようサポートいたします。",
      },
      {
        q: "問い合わせ時に対応できる外国人スタッフはいますか？",
        a: "はい、多言語対応可能な外国人スタッフが在籍しておりますのでご安心ください。",
      },
      {
        q: "アルバイト経験だけでも正社員になれますか？",
        a: "はい、可能です。アルバイトでの継続的な経験も評価されることがあります。",
      },
      {
        q: "家探しや住民登録などの生活面のサポートもありますか？",
        a: "はい、不動産会社との提携や生活支援も一部行っております。お気軽にご相談ください。",
      },
      {
        q: "日本での働き方やビジネスマナーは教えてもらえますか？",
        a: "はい、必要に応じて日本の職場マナーや文化についての研修も実施可能です。",
      },
      {
        q: "日本語学校の留学生でも就労ビザへ変更できますか？",
        a: "はい、変更可能です。ただし、母国において短期大学または大学を卒業されていることが条件となります。",
      },
      {
        q: "就職が決まらない場合、帰国するしかないのでしょうか？何か良い方法はありますか？",
        a: "はい、ございます。詳しくは弊社までご相談ください。",
      },
      {
        q: "問い合わせ時に対応できる外国人スタッフはいますか？",
        a: "はい、外国人スタッフも在籍しておりますので、安心してご相談いただけます。",
      },
      {
        q: "エントリー時に必要なものはありますか？",
        a: "必須ではありませんが、履歴書をお持ちの場合は、エントリー時にアップロードいただくか、エントリー後に担当コンサルタント宛にお送りください。",
      },
      {
        q: "パソコンを持っていなくても問題ありませんか？",
        a: "はい、問題ありません。\nWEBテストやWEB面接を実施する企業も多いため、パソコンをお持ちの方がスムーズに進められる場合もありますが、パソコンをお持ちでない方には、Googleドキュメント等を活用しながら書類作成やアドバイスを行っておりますのでご安心ください。",
      },
      {
        q: "面接に自信がありません。サポートはありますか？",
        a: "はい、ご希望の方には面接練習を実施しております。\n弊社コンサルタントによる模擬面接など、しっかりと対策をサポートいたします。",
      },
      {
        q: "エージェントとの面談は必須でしょうか？",
        a: "はい、初回面談には必ずご参加いただいております。\n書類上ではわからないご経験やご希望をしっかりお伺いし、より良い就職活動をサポートするためです。基本的にはオンラインにて1時間程度を想定しておりますが、ご都合に応じて面談方法や時間のご相談も可能です。",
      },
      {
        q: "履歴書の内容に自信がありません。サポートはありますか？",
        a: "はい、履歴書の添削も実施しております。\n年間500通以上の応募書類を見ているコンサルタントが、志望企業・職種に合わせたアピールポイントを引き出し、書類作成をサポートいたします。",
      },
      {
        q: "就職活動はいつから始めればよいでしょうか？",
        a: "ご状況やご希望によって異なりますが、一般的な流れは下記の通りです。\n「エントリー（またはプレエントリー）→コンサルタント面談→応募→書類選考→面接（1～2回）→内定→ビザ→入社」\n目安として、登録から内定まで最短で1ヶ月、スムーズに進んだ場合でも2～3ヶ月ほどかかります。\nまた、内定から入社までは通常1～3ヶ月程度を想定しています。\n求人状況や条件によっては、エントリーから就職までに時間を要する場合もございます。",
      },
      {
        q: "面談方法にはどのようなものがありますか？",
        a: "オンライン（Google Meet、Zoom等）、お電話、対面での面談が可能です。ご希望に応じて対応いたしますので、お気軽にご相談ください。",
      },
      {
        q: "平日終業後や土日の面談も可能でしょうか？",
        a: "はい、可能です。\nエントリー後にご希望の面談日時をお伺いしますので、その際にご相談ください。",
      },
    ],
  },
];

export default function FAQ() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);

  const activeFaqs = useMemo(() => {
    return CATEGORIES.find((c) => c.id === activeId)?.faqs ?? [];
  }, [activeId]);

  return (
    <>
      <section className="w-full mt-32 border-b border-gray-300">
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0 pb-9 page_title">
          <h1 className="font-semibold">FAQ</h1>
          <h6 className="font-semibold text-[var(--color-text-secondary)]">
            よくあるご質問
          </h6>
        </div>
      </section>

      <section>
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0">
          <Breadcrumbs items={BREADCRUMB_ITEMS} />
        </div>
      </section>

      <section className="xl:w-[75%] my-16 lg:my-24 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 xl:px-0">
        <aside className="lg:col-span-4">
          <nav className="bg-[#F6F7F8] pb-16 px-3">
            <h5 className="font-bold mb-4 pb-4 px-3 pt-4 border-b border-gray-300 border-solid">
              よくあるご質問内容
            </h5>
            <ul className="space-y-2">
              {CATEGORIES.map((cat, idx) => {
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
                          isActive
                            ? "bg-[var(--color-primary)] text-white"
                            : "bg-gray-200 text-gray-700",
                        ].join(" ")}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-sm font-medium">{cat.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <aside className="lg:col-span-8 px-2 lg:px-0">
          <div className="space-y-8">
            {activeFaqs.map((item, i) => (
              <div key={i} className="border-b border-gray-200 pb-6">
                <p className="font-bold mb-2">
                  <span className="text-[var(--color-primary)] text-sm mr-2">Q.</span>
                  {item.q}
                </p>
                <p className="text-sm whitespace-pre-line">
                  <span className="font-semibold mr-2">A.</span>
                  {item.a}
                </p>
              </div>
            ))}
            {activeFaqs.length === 0 ? (
              <p className="text-gray-500">質問はまだありません。</p>
            ) : null}
          </div>
        </aside>
      </section>
    </>
  );
}
