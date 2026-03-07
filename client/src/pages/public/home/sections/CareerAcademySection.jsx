import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const cards = [
    {
        image: "https://picsum.photos/600/400?random=1",
        subheading: "CAREER ACADEMY",
        title: "就職活動支援",
        description:
            "履歴書・職務経歴書の書き方から面接対策まで、就職活動を成功させるための実践的な指導を行います。",
    },
    {
        image: "https://picsum.photos/600/400?random=2",
        subheading: "CAREER ACADEMY",
        title: "特定技能試験対策",
        description:
            "介護・外食・製造などの分野での特定技能制度に対応した試験対策講座で合格をサポートします。",
    },
    {
        image: "https://picsum.photos/600/400?random=3",
        subheading: "CAREER ACADEMY",
        title: "個別サポート",
        description:
            "学生一人ひとりの希望やレベルに応じて個別サポートや進路相談を行っています。",
    },
];



export default function CareerAcademy() {
    return (
        <section className="xl:w-[75%] xl:mx-auto px-4 lg:px-6 xl:px-0 py-10">
            <h2 className="text-center font-semibold tracking-tight text-[#0D0F11]">
                CAREER ACADEMY
            </h2>

            <h6 className="text-center mb-8 font-semibold">教育業務</h6>

            <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
                    >
                        {/* Image */}
                        <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-56 object-cover rounded-t-2xl"
                        />

                        {/* Content */}
                        <div className="flex flex-col flex-grow p-5">
                            <h6 className="text-xs font-semibold text-[#96999B] tracking-wide mb-2">
                                {card.subheading}
                            </h6>

                            <h5 className="font-bold text-[var(--color-dark)] mb-6">{card.title}</h5>

                            <p className="text-gray-600 flex-grow">{card.description}</p>

                            {/* Footer */}
                            <div className="flex justify-between items-center mt-4">
                                <Link
                                    to="/career_academy"
                                    className="link text-[#0080FF] text-sm font-medium"
                                >
                                    詳しくはこちら
                                    <span className="ml-2 text-[#0080FF] inline-block">
                                        <FaArrowRight />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

