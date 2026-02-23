import nodemailer from "nodemailer";

const COMPANY_CONTACT_EMAIL = process.env.CONTACT_COMPANY_EMAIL || "contact@horizongroup.co.jp";
const CANDIDATE_CONTACT_EMAIL = process.env.CONTACT_CANDIDATE_EMAIL || "recruit@horizongroup.co.jp";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_SECURE = String(process.env.SMTP_SECURE || "false") === "true";
const EMAIL_FROM = process.env.EMAIL_FROM || SMTP_USER;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const getRecipient = (type) =>
  type === "COMPANY" ? COMPANY_CONTACT_EMAIL : CANDIDATE_CONTACT_EMAIL;

const buildEmailText = (contact) => {
  const lines = [
    `Contact type: ${contact.type}`,
    `Name: ${contact.firstName} ${contact.lastName}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phoneNumber}`,
    `Postal code: ${contact.postalCode}`,
    `Address: ${contact.address}`,
    `Message: ${contact.message}`,
  ];

  if (contact.type === "COMPANY" && contact.company) {
    lines.push(`Company: ${contact.company.companyName}`);
    lines.push(`Position: ${contact.company.position}`);
    lines.push(`Inquiry type: ${contact.company.inquiryType}`);
  }

  if (contact.type === "CANDIDATE" && contact.candidate) {
    lines.push(`Inquiry type: ${contact.candidate.inquiryType}`);
    lines.push(`Resume URL: ${contact.candidate.resumeUrl || "-"}`);
  }

  return lines.join("\n");
};

export const sendContactNotificationEmail = async (contact) => {
  const recipient = getRecipient(contact.type);

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: recipient,
    replyTo: contact.email,
    subject: `[Horizon Group] New ${contact.type.toLowerCase()} contact #${contact.id}`,
    text: buildEmailText(contact),
  });
};
