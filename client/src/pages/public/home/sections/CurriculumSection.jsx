import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
//icon

import ghCurriculum01 from "@assets/images/common/hg-curriculum01.jpg";
import ghCurriculum02 from "@assets/images/common/hg-curriculum02.jpg";
import ghCurriculum03 from "@assets/images/common/hg-curriculum03.jpg";
import ghCurriculum04 from "@assets/images/common/hg-curriculum04.jpg";
import ghCurriculum05 from "@assets/images/common/hg-curriculum05.jpg";
import ghCurriculum06 from "@assets/images/common/hg-curriculum06.jpg";

export default function CurriculumSection() {
    const curriculumItems = [
        {
            image: ghCurriculum01,
            title: "履歴書・職務経歴書の書き方",
            desc: "日本の企業に響く書類作成のコツを学びます"
        },
        {
            image: ghCurriculum02,
            title: "面接マナー・身だしなみ",
            desc: "面接での話し方や適切な身だしなみを指導します"
        },
        {
            image: ghCurriculum03,
            title: "職場での常識・ビジネスマナー",
            desc: "日本の職場文化とビジネスマナーを理解します"
        },
        {
            image: ghCurriculum04,
            title: "接客業向け会話表現",
            desc: "接客に必要な日本語・英語の会話表現を習得します"
        },
        {
            image: ghCurriculum05,
            title: "日本での生活マナー",
            desc: "日本社会での生活に必要な文化理解を深めます"
        },
        {
            image: ghCurriculum06,
            title: "進路相談・個別指導",
            desc: "個人の目標に合わせたキャリアプランを作成します"
        }
    ]

    return (
        <section className="xl:w-[75%] mx-auto px-4 md:px-0 py-10">
            <div className="mx-auto md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left column */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-bold ">
                            CURRICULUM
                        </h3>
                        <h6 className="font-semibold mt-1">カリキュラム</h6>
                    </div>

                    <div className="hidden xl:block">
                        <Link to="/career_academy" className="link mt-6 font-medium inline-flex items-center gap-2">
                            <span>詳しくはこちら</span>
                            <FaArrowRight />
                        </Link>
                    </div>
                </div>

                {/* Right column */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {curriculumItems.map((item, index) => (
                        <div key={index} className="flex gap-4">
                            <img
                                src={item.image}
                                alt=""
                                className="w-20 h-20 object-cover rounded shadow-sm"
                            />
                            <div>
                                <h5 className="font-semibold">
                                    {item.title}
                                </h5>
                                <p className="text-sm mt-1">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}




