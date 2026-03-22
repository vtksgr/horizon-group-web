const COMPANY_INQUIRY_LABELS = {
  RECRUITMENT: "人材紹介",
  INTERNATIONAL_STUDENT_SUPPORT: "留学生支援",
  INTERPRETATION_TRANSLATION: "通訳・翻訳",
  SPECIFIED_SKILLED_WORKER: "特定技能",
  REGISTRATION_SUPPORT: "登録支援",
  EDUCATION_CONSULTING: "教育・コンサルティング",
  OTHER: "その他のお問い合わせ",
};

const getInquiryLabel = (inquiryType) => {
  if (!inquiryType) return "-";
  return COMPANY_INQUIRY_LABELS[inquiryType] || inquiryType;
};

const getSiteName = (siteName) => siteName || process.env.EMAIL_SITE_NAME || "Horizon Group";

const getSupportEmail = (supportEmail) =>
  supportEmail ||
  process.env.CONTACT_COMPANY_EMAIL ||
  process.env.EMAIL_FROM ||
  process.env.SMTP_USER ||
  "contact@horizongroup.co.jp";

export const buildCompanyReplyEmail = (contact, options = {}) => {
  const firstName = contact?.firstName || "";
  const lastName = contact?.lastName || "";
  const fullName = `${lastName} ${firstName}`.trim() || "お客様";
  const email = contact?.email || "-";
  const phoneNumber = contact?.phoneNumber || "-";
  const inquiryType = getInquiryLabel(contact?.company?.inquiryType || contact?.inquiryType);
  const message = contact?.message || "-";
  const siteName = getSiteName(options.siteName);
  const supportEmail = getSupportEmail(options.supportEmail);

  return {
    subject: `[${siteName}] お問い合わせありがとうございます`,
    text: `${fullName} 様

この度は、弊社へお問い合わせいただき誠にありがとうございます。
以下の内容でお問い合わせを受け付けいたしました。

---

■ お問い合わせ内容
【お名前】${fullName} 様
【メールアドレス】${email}
【電話番号】${phoneNumber}
【お問い合わせ種類】${inquiryType}
【内容】
${message}
------------

現在、担当者にて内容を確認しております。
通常、2〜3営業日以内にご連絡させていただきます。

また、履歴書をご提出いただいた場合は、内容を確認のうえ、
今後のご案内をさせていただきます。

なお、本メールは自動返信となっております。
万が一、数日経っても返信がない場合は、恐れ入りますが再度お問い合わせください。

今後とも何卒よろしくお願い申し上げます。

---

${siteName}
サポート窓口
メール：${supportEmail}
---------------`,
  };
};

export default buildCompanyReplyEmail;
