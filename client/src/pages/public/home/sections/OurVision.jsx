import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import OurVisionImg from "@/assets/images/common/our_vision.jpg";
import "./OurVision.css";

export default function OurVision() {
    return (
        <section className="w-full xl:w-[75%] px-4 sm:px-6 lg:px-8 xl:px-0 mx-auto">
            <div className="flex flex-col xl:flex-row gap-8 xl:gap-16">

                {/* Image */}
                <div className="w-full xl:w-1/2">
                    <img
                        src={OurVisionImg}
                        alt="Our Vision"
                        className="object-cover rounded-xl w-full h-auto shadow-md"
                    />
                </div>

                {/* Content */}
                <div className="w-full xl:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 sec-title">
                        OUR VISION
                    </h2>

                    <h6 className="text-base md:text-lg font-medium mb-8">
                        私たちのビジョン
                    </h6>

                    <p className="text-sm md:text-base mb-3 leading-relaxed">
                        HORIZON GROUPは、世界を目指す優秀な外国人材と、
                        グローバルな成長を志す日本企業を結ぶ、
                        信頼の架け橋となることを目指しています。
                    </p>

                    <p className="text-sm md:text-base mb-8 leading-relaxed">
                        私たちチームメンバーは全員が日本での留学・就労経験があり、
                        その経験と共感を活かし、候補者様と企業様の双方に
                        心からのサポートを提供いたします。
                    </p>

                    <div className="flex justify-start sm:justify-end">
                        <Link
                            to="/about"
                            className="link text-[#0080FF] text-right hover:!text-[#00B1E6] inline-flex items-center gap-2"
                        >
                            私たちについて <FaArrowRight />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
