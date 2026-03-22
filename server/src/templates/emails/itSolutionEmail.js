const IT_SOLUTION_INQUIRY_LABELS = {
  WEB_DEVELOPMENT: "Web Development",
  DESIGN_AND_BRANDING: "Design and Branding",
  DIGITAL_MARKETING_SEO: "Digital Marketing & SEO",
  IT_SUPPORT_CONSULTING: "IT Support & Consulting",
  DESIGN_PRINT: "Design Print",
  OTHERS: "Others",
};

const getInquiryLabel = (inquiryType) => {
  if (!inquiryType) return "-";
  return IT_SOLUTION_INQUIRY_LABELS[inquiryType] || inquiryType;
};

const getSiteName = (siteName) => siteName || process.env.EMAIL_SITE_NAME || "Horizon Group";

const getSupportEmail = (supportEmail) =>
  supportEmail ||
  process.env.CONTACT_IT_SOLUTION_EMAIL ||
  process.env.CONTACT_COMPANY_EMAIL ||
  process.env.EMAIL_FROM ||
  process.env.SMTP_USER ||
  "contact@horizongroup.co.jp";

export const buildItSolutionReplyEmail = (contact, options = {}) => {
  const firstName = contact?.firstName || "";
  const lastName = contact?.lastName || "";
  const fullName = `${lastName} ${firstName}`.trim() || "お客様";
  const companyName = contact?.itSolution?.companyName || contact?.companyName || "-";
  const email = contact?.email || "-";
  const inquiryType = getInquiryLabel(contact?.itSolution?.inquiryType || contact?.inquiryType);
  const message = contact?.message || "-";
  const siteName = getSiteName(options.siteName);
  const supportEmail = getSupportEmail(options.supportEmail);

  return {
    subject: `[${siteName}] ITソリューションお問い合わせありがとうございます`,
    text: `${fullName} 様

この度は、ITソリューションについてお問い合わせいただき誠にありがとうございます。
以下の内容でお問い合わせを受け付けいたしました。

---

■ お問い合わせ内容
【会社名】${companyName}
【お名前】${fullName} 様
【メールアドレス】${email}
【お問い合わせ種類】${inquiryType}
【詳細】
${message}
------------

担当者にて内容を確認のうえ、通常2〜3営業日以内にご連絡いたします。

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

export default buildItSolutionReplyEmail;