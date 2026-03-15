import Breadcrumbs from "../../components/ui/breadcrumbs/Breadcrumbs";
import hbBuildingImg from "@assets/images/common/hb-building-img.jpg";
import useLocalizedCopy from "../../hooks/useLocalizedCopy";

const companyProfileCopy = {
  ja: {
    crumbs: { home: "ホーム", company: "会社概要" },
    subtitle: "会社情報",
    labels: {
      companyName: "会社名",
      address: "住所",
      founded: "会社設立",
      capital: "資本金",
      ceo: "代表取締役/CEO",
      coo: "取締役/COO",
      url: "URL",
      email: "Eメール",
      tel: "TEL",
      fax: "FAX",
      business: "事業内容",
      permits: "許可等",
    },
    business: [
      "外国人向けの人材紹介",
      "外国人労働者の就労支援サポート",
      "南アジア各国からの留学生紹介",
      "ビザ申請手続のサポート(新規・更新)",
      "IT関連(アプリ開発・Webページ制作・SNS運用代行)",
      "ネパールにおける日本語学校の運営",
      "外国人インターンシップ受入サポート支援業務",
    ],
    accessSubtitle: "アクセス",
    mapLink: "Google Map で見る",
  },
  en: {
    crumbs: { home: "Home", company: "Company" },
    subtitle: "Company Information",
    labels: {
      companyName: "Company Name",
      address: "Address",
      founded: "Established",
      capital: "Capital",
      ceo: "Representative Director / CEO",
      coo: "Director / COO",
      url: "URL",
      email: "Email",
      tel: "TEL",
      fax: "FAX",
      business: "Business Description",
      permits: "Licenses",
    },
    business: [
      "Recruitment services for international talent",
      "Employment support for foreign workers",
      "Student referral services from South Asian countries",
      "Visa application support (new and renewal)",
      "IT services (app development, web production, social media operations)",
      "Operation of Japanese language school in Nepal",
      "Support services for accepting international interns",
    ],
    accessSubtitle: "Access",
    mapLink: "View on Google Maps",
  },
};

export default function CompanyProfile() {
  const t = useLocalizedCopy(companyProfileCopy);

  const breadcrumbItems = [
    { label: t.crumbs.home, to: "/" },
    { label: t.crumbs.company, to: "/company_profile" },
  ];

  return (
    <>
      <section className="w-full mt-32 border-b border-gray-300">
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0 pb-9 page_title">
          <h1 className="font-semibold">COMPANY PROFILE</h1>
          <h6 className="font-semibold text-[var(--color-text-secondary)]">{t.subtitle}</h6>
        </div>
      </section>

      <section>
        <div className="lg:w-[75%] mx-auto px-7 lg:px-0">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </section>

      <section className="md:w-[75%] mx-auto px-6 md:px-0 mt-16 lg:mt-24 company-profile">
        <div className="mt-10 lg:mt-16">
          <ul className="divide-y divide-gray-300 mt-8">
            <li className="flex flex-col md:flex-row py-8 text-sm">
              <p className="w-32 min-w-fit font-semibold">{t.labels.companyName}</p>
              <div>
                <p className="md:ml-8 pb-2">株式会社HORIZON GROUP （ホライゾングループ）</p>
                <p className="md:ml-8">HORIZON GROUP Co., Ltd.</p>
              </div>
            </li>
            <li className="flex flex-col md:flex-row py-8 text-sm">
              <p className="w-32 min-w-fit font-semibold">{t.labels.address}</p>
              <div>
                <p className="md:ml-8">〒169-0073</p>
                <p className="md:ml-8">東京都新宿区百人町1丁目20番26号バラードハイムムサシノビル806号室</p>
              </div>
            </li>
            <li className="flex flex-col md:flex-row py-8 text-sm">
              <p className="w-32 min-w-fit font-semibold">{t.labels.founded}</p>
              <p className="md:ml-8">2024年05月</p>
            </li>
            <li className="flex flex-col md:flex-row py-8 text-sm">
              <p className="w-32 min-w-fit font-semibold">{t.labels.capital}</p>
              <p className="md:ml-8">10,000,000円</p>
            </li>
            <li className="flex flex-col md:flex-row py-8 text-sm">
              <p className="w-32 min-w-fit font-semibold">{t.labels.ceo}</p>
              <p className="md:ml-8">ダンギ ティラク</p>
            </li>
            <li className="flex flex-col md:flex-row py-8 text-sm">
              <p className="w-32 min-w-fit font-semibold">{t.labels.coo}</p>
              <p className="md:ml-8">スベディ サントス</p>
            </li>
            <li className="flex flex-col md:flex-row py-8 text-sm">
              <p className="w-32 min-w-fit font-semibold">{t.labels.url}</p>
              <p className="md:ml-8">https://www.horizongroup.co.jp/</p>
            </li>
            <li className="flex flex-col md:flex-row py-8 text-sm">
              <p className="w-32 min-w-fit font-semibold">{t.labels.email}</p>
              <p className="md:ml-8">info@horizongroup.co.jp</p>
            </li>
            <li className="flex flex-col md:flex-row py-8 text-sm">
              <p className="w-32 min-w-fit font-semibold">{t.labels.tel}</p>
              <p className="md:ml-8">03-5497-8734</p>
            </li>
            <li className="flex flex-col md:flex-row py-8 text-sm">
              <p className="w-32 min-w-fit font-semibold">{t.labels.fax}</p>
              <p className="md:ml-8">03-5497-8735</p>
            </li>
            <li className="flex flex-col md:flex-row py-8 text-sm">
              <p className="w-32 min-w-fit font-semibold">{t.labels.business}</p>
              <p className="md:ml-8 leading-7">
                {t.business.map((item) => (
                  <span key={item}>
                    {item}
                    <br />
                  </span>
                ))}
              </p>
            </li>
            <li className="flex flex-col md:flex-row py-8 text-sm border-b border-gray-300">
              <p className="w-32 min-w-fit font-semibold">{t.labels.permits}</p>
              <p className="md:ml-8">有料職業紹介事業許可番号：13 - ユ - 317409</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="md:w-[75%] mx-auto px-6 md:px-0 mt-20 mb-28 lg:mt-32 lg:mb-40 access">
        <div className="flex items-end mb-9 gap-4">
          <h3 className="font-semibold text-2xl">ACCESS</h3>
          <h6 className="font-semibold text-[var(--color-text-secondary)]">{t.accessSubtitle}</h6>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-7/12 px-4 mb-4 md:mb-0">
            <div className="h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.058600579586!2d139.693767576232!3d35.7001755289325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188df333d0cda5%3A0x64755b23f013069e!2z5qCq5byP5Lya56S-SE9SSVpPTiBHUk9VUA!5e0!3m2!1sen!2sjp!4v1755003397349!5m2!1sen!2sjp"
                className="w-full h-[500px] md:h-full shadow-md rounded-lg"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="mt-6">
                <p className="mb-2">株式会社HORIZON GROUP （ホライゾングループ）</p>
                <p className="text-sm">〒169-0073 東京都新宿区百人町1丁目20番26号</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-5/12 px-4">
            <div className="h-[500px] md:h-full overflow-hidden">
              <img
                src={hbBuildingImg}
                alt="hg-location-building"
                className="w-full h-full object-cover object-center shadow-md rounded-lg"
              />
            </div>
            <p className="mt-6 text-right">{t.mapLink}</p>
          </div>
        </div>
      </section>
    </>
  );
}
