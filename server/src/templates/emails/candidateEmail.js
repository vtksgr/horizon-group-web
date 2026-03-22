const CANDIDATE_INQUIRY_LABELS = {
	INTERVIEWS_CONSULTATIONS: "面談・相談",
	RECRUITMENT: "人材紹介",
	ONLINE_CLASSES: "オンライン授業",
	SEMINAR_PARTICIPATION: "セミナー参加",
	JOB_HUNTING_SUPPORT: "就職活動サポート",
	CAREER_CHANGE_SUPPORT: "転職サポート",
	OTHER_SUPPORT: "その他サポート",
};

const getInquiryLabel = (inquiryType) => {
	if (!inquiryType) return "-";
	return CANDIDATE_INQUIRY_LABELS[inquiryType] || inquiryType;
};

const getSiteName = (siteName) => siteName || process.env.EMAIL_SITE_NAME || "Horizon Group";

const getSupportEmail = (supportEmail) =>
	supportEmail ||
	process.env.CONTACT_CANDIDATE_EMAIL ||
	process.env.EMAIL_FROM ||
	process.env.SMTP_USER ||
	"recruit@horizongroup.co.jp";

export const buildCandidateReplyEmail = (contact, options = {}) => {
	const firstName = contact?.firstName || "";
	const lastName = contact?.lastName || "";
	const fullName = `${lastName} ${firstName}`.trim() || "お客様";
	const email = contact?.email || "-";
	const phoneNumber = contact?.phoneNumber || "-";
	const inquiryType = getInquiryLabel(contact?.candidate?.inquiryType || contact?.inquiryType);
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

export default buildCandidateReplyEmail;
