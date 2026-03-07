
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const faqs = [
  {
    question: "小さな会社でも外国人を採用できますか？",
    answer:
      "はい、可能です。採用人数に制限がある場合もございますが、ビザ取得も問題なく対応可能です。詳しくは弊社までお気軽にご相談ください。",
  },
  {
    question: "対象エリアはどこですか？",
    answer: "全国対応可能です。一部地域では制限がある場合がございます。",
  },
  {
    question: "外国人採用にあたって、賃金や保険はどうすればよいですか？",
    answer: "法令に基づいた賃金や保険制度を整備する必要があります。",
  },
  {
    question: "入社までの期間はどれくらいですか？",
    answer: "通常は1〜3ヶ月程度ですが、状況によって異なります。",
  },
  {
    question: "コミュニケーション面が不安です。",
    answer: "言語サポートや文化研修を通して不安を軽減できます。",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="max-w-3xl mx-auto py-12 px-6 lg:px-0">
      <div className="text-center mb-10">
        <h2 className="text-center font-semibold tracking-tight text-[#0D0F11]">FAQ</h2>
        <h6 className="text-center mb-3 font-semibold">よくあるご質問</h6>
      </div>

      {faqs.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            type="button"
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
          >
            <span className="flex items-start gap-2 text-left flex-1 pr-4">
              <span className="font-medium text-[var(--color-primary)] shrink-0">Q.</span>
              <span className="font-medium text-[var(--color-dark)]">{item.question}</span>
            </span>
            <svg
              className={`w-5 h-5 shrink-0 transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openIndex === index && (
            <div className="pb-4 text-sm leading-relaxed flex items-start gap-2">
              <span className="font-medium text-[var(--color-dark)] shrink-0">A.</span>
              <span className="text-gray-600">{item.answer}</span>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-center mt-8">
        <Link to="/faq" className="link text-[#0080FF] hover:!text-[var(--color-primary)] inline-flex items-center gap-2">
          <span>すべてを見る</span>
          <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}

