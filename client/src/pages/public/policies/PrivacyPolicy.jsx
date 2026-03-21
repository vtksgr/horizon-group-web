import Breadcrumbs from "../../../components/ui/breadcrumbs/Breadcrumbs";
import useLocalizedCopy from "../../../hooks/useLocalizedCopy";

const copy = {
  ja: {
    crumbs: { home: "ホーム", policy: "プライバシーポリシー" },
    subtitle: "プライバシーポリシー",
    introTitle: "当社の個人情報の取り扱いについて",
    introBody: "株式会社HORIZON GROUPでは、以下の通り個人情報の取り扱いについて定めます。",
    sections: [
      {
        title: "1. 収集する個人情報の内容",
        body: "当社は、お問い合わせや資料請求の際に、お名前、電話番号、メールアドレス等の情報をご入力いただく場合があります。",
      },
      {
        title: "2. 個人情報の利用目的",
        body: "取得した個人情報は、お問い合わせ対応や資料送付、サービス案内等の目的で利用します。",
      },
      {
        title: "3. 個人情報の開示について",
        list: ["法令に基づく場合", "人命・財産保護のために必要な場合", "公的機関の要請がある場合"],
      },
      {
        title: "4. 個人情報の取扱いの委託について",
        body: "当社は、業務遂行のために個人情報の取扱いを外部業者に委託する場合があります。",
      },
      {
        title: "5. 保有個人データに関するご本人の権利",
        body: "開示、訂正、削除等の請求が可能です（法令に基づく例外を除きます）。",
      },
      {
        title: "6. クッキー（Cookie）の使用について",
        body: "当社はCookieを利用して、ユーザーの利便性向上やアクセス解析を行います。",
      },
      {
        title: "7. 安全管理措置について",
        body: "当社は、個人情報を適切に管理し、不正アクセス、紛失、改ざん等を防止します。",
      },
      {
        title: "8. 継続的な改善",
        body: "当社は、個人情報保護の取組を継続的に見直し、改善します。",
      },
      {
        title: "9. お問い合わせ窓口について",
        body: "個人情報の取扱いに関するお問い合わせは、下記窓口までお願いします。",
      },
    ],
  },
  en: {
    crumbs: { home: "Home", policy: "Privacy Policy" },
    subtitle: "Privacy Policy",
    introTitle: "How We Handle Personal Information",
    introBody: "HORIZON GROUP Co., Ltd. defines the handling of personal information as follows.",
    sections: [
      {
        title: "1. Personal Information We Collect",
        body: "When you contact us or request materials, we may ask for your name, phone number, email address, and similar details.",
      },
      {
        title: "2. Purpose of Use",
        body: "Collected personal information is used for inquiry responses, document delivery, and service guidance.",
      },
      {
        title: "3. Disclosure of Personal Information",
        list: [
          "When required by laws and regulations",
          "When necessary to protect life or property",
          "When requested by public authorities",
        ],
      },
      {
        title: "4. Outsourcing of Handling",
        body: "We may outsource the handling of personal information to external vendors for business operations.",
      },
      {
        title: "5. Rights of Data Subjects",
        body: "You may request disclosure, correction, or deletion of your data, except where legal exemptions apply.",
      },
      {
        title: "6. Use of Cookies",
        body: "We use cookies to improve user convenience and to analyze website usage.",
      },
      {
        title: "7. Security Measures",
        body: "We appropriately manage personal information and prevent unauthorized access, loss, and tampering.",
      },
      {
        title: "8. Continuous Improvement",
        body: "We continuously review and improve our privacy and data protection practices.",
      },
      {
        title: "9. Contact Window",
        body: "For inquiries regarding personal information handling, please contact the following office.",
      },
    ],
  },
};

export default function PrivacyPolicy() {
  const t = useLocalizedCopy(copy);

  const breadcrumbsItems = [
    { label: t.crumbs.home, to: "/" },
    { label: t.crumbs.policy, to: "/privacy_policy" },
  ];

  return (
    <>
      <section className="w-full mt-32 border-b border-gray-300">
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0 pb-9 page_title">
          <h1 className="font-semibold">Privacy Policy</h1>
          <h6 className="font-semibold text-[var(--color-text-secondary)]">{t.subtitle}</h6>
        </div>
      </section>

      <section>
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
      </section>

      <section className="lg:w-[75%] mx-auto px-7 lg:px-0 py-10 mt-10 lg:mt-16">
        <div className="mb-16">
          <h4 className="font-semibold pb-3">{t.introTitle}</h4>
          <p>{t.introBody}</p>
        </div>

        {t.sections.map((section) => (
          <div key={section.title} className="mb-9">
            <p className="font-bold mb-2">{section.title}</p>
            {section.body ? <p>{section.body}</p> : null}
            {section.list ? (
              <ul className="list-disc list-inside">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}

        <div className="border-t border-gray-300 pt-4 mt-8 text-sm">
          <h3 className="font-bold">CONTACT</h3>
          <p>株式会社HORIZON GROUP</p>
          <p>〒169-0073</p>
          <p>東京都新宿区百人町1-20-26バラードハイムムサシノビル806</p>
          <p>TEL: 03-5497-8374 / FAX: 03-5497-8735</p>
          <p>Email: info@horizongroup.co.jp</p>
        </div>
      </section>
    </>
  );
}
