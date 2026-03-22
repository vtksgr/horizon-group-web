import nodemailer from "nodemailer";
import { buildCompanyReplyEmail } from "../templates/emails/companyEmail.js";
import { buildCandidateReplyEmail } from "../templates/emails/candidateEmail.js";
import { buildItSolutionReplyEmail } from "../templates/emails/itSolutionEmail.js";



const COMPANY_CONTACT_EMAIL = process.env.CONTACT_COMPANY_EMAIL || "contact@horizongroup.co.jp";
const CANDIDATE_CONTACT_EMAIL = process.env.CONTACT_CANDIDATE_EMAIL || "recruit@horizongroup.co.jp";
const IT_SOLUTION_CONTACT_EMAIL =
  process.env.CONTACT_IT_SOLUTION_EMAIL ||
  process.env.CONTACT_COMPANY_EMAIL ||
  "contact@horizongroup.co.jp";

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
  type === "COMPANY"
    ? COMPANY_CONTACT_EMAIL
    : type === "ITSOLUTION"
      ? IT_SOLUTION_CONTACT_EMAIL
      : CANDIDATE_CONTACT_EMAIL;

const getTypeLabel = (type) =>
  type === "COMPANY"
    ? "company"
    : type === "ITSOLUTION"
      ? "it solution"
      : "candidate";

const getReplyEmailContent = (contact) => {
  const supportEmail = getRecipient(contact.type);

  if (contact.type === "COMPANY") {
    return buildCompanyReplyEmail(contact, { supportEmail });
  }

  if (contact.type === "ITSOLUTION") {
    return buildItSolutionReplyEmail(contact, { supportEmail });
  }

  return buildCandidateReplyEmail(contact, { supportEmail });
};

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

  if (contact.type === "ITSOLUTION" && contact.itSolution) {
    lines.push(`Company: ${contact.itSolution.companyName}`);
    lines.push(`Inquiry type: ${contact.itSolution.inquiryType}`);
  }

  return lines.join("\n");
};

export const sendContactNotificationEmail = async (contact) => {
  const recipient = getRecipient(contact.type);
  const replyEmail = getReplyEmailContent(contact);

  await Promise.all([
    transporter.sendMail({
      from: EMAIL_FROM,
      to: recipient,
      replyTo: contact.email,
      subject: `[Horizon Group] New ${getTypeLabel(contact.type)} contact #${contact.id}`,
      text: buildEmailText(contact),
    }),
    transporter.sendMail({
      from: EMAIL_FROM,
      to: contact.email,
      replyTo: recipient,
      subject: replyEmail.subject,
      text: replyEmail.text,
    }),
  ]);
};
