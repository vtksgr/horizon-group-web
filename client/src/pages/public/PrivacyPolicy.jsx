import Breadcrumbs from "../../components/ui/breadcrumbs/Breadcrumbs";

export default function PrivacyPolicy() {
  const breadcrumbsItems = [
    { label: "ホーム", to: "/" },
    { label: "プライバシーポリシー", to: "/privacy_policy" },
  ];

  return (
    <>
      <section className="w-full mt-32 border-b border-gray-300">
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0 pb-9 page_title">
          <h1 className="font-semibold">Privacy Policies</h1>
          <h6 className="font-semibold text-[var(--color-text-secondary)]">
            プライバシーポリシー
          </h6>
        </div>
      </section>

      <section>
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
      </section>

      <section className="lg:w-[75%] mx-auto px-7 lg:px-0 py-10 mt-10 lg:mt-16">
        <div className="mb-16">
          <h4 className="font-semibold pb-3">当社の個人情報の取り扱いについて</h4>
          <p>
            株式会社HORIZON GROUPでは、以下の通り個人情報の取り扱いについて定めます。
          </p>
        </div>

        <div className="mb-9">
          <p className="font-bold mb-2">1. 収集する個人情報の内容</p>
          <p>
            当社は、お問い合わせや資料請求の際に、お名前、電話番号、メールアドレス等の情報をご入力いただく場合があります。
          </p>
        </div>

        <div className="mb-9">
          <p className="font-bold mb-2">2. 個人情報の利用目的</p>
          <p>
            取得した個人情報は、お問い合わせ対応や資料送付、サービス案内等の目的で利用します。
          </p>
        </div>

        <div className="mb-9">
          <p className="font-bold mb-2">3. 個人情報の開示について</p>
          <ul className="list-disc list-inside">
            <li>法令に基づく場合</li>
            <li>人命・財産保護のために必要な場合</li>
            <li>公的機関の要請がある場合</li>
          </ul>
        </div>

        <div className="mb-9">
          <p className="font-bold mb-2">4. 個人情報の取扱いの委託について</p>
          <p>
            当社は、業務遂行のために個人情報の取扱いを外部業者に委託する場合があります。
          </p>
        </div>

        <div className="mb-9">
          <p className="font-bold mb-2">5. 保有個人データに関するご本人の権利</p>
          <p>
            開示、訂正、削除等の請求が可能です（法令に基づく例外を除きます）。
          </p>
        </div>

        <div className="mb-9">
          <p className="font-bold mb-2">6. クッキー（Cookie）の使用について</p>
          <p>
            当社はCookieを利用して、ユーザーの利便性向上やアクセス解析を行います。
          </p>
        </div>

        <div className="mb-9">
          <p className="font-bold mb-2">7. 安全管理措置について</p>
          <p>
            当社は、個人情報を適切に管理し、不正アクセス、紛失、改ざん等を防止します。
          </p>
        </div>

        <div className="mb-9">
          <p className="font-bold mb-2">8. 継続的な改善</p>
          <p>
            当社は、個人情報保護の取組を継続的に見直し、改善します。
          </p>
        </div>

        <div className="mb-9">
          <p className="font-bold mb-2">9. お問い合わせ窓口について</p>
          <p>
            個人情報の取扱いに関するお問い合わせは、下記窓口までお願いします。
          </p>
        </div>

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
