import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import OurVisionImg from "@/assets/images/common/our_vision.jpg";
import "./OurVision.css";
import useLocalizedCopy from "../../../../hooks/useLocalizedCopy";

const copy = {
    ja: {
        subtitle: "私たちのビジョン",
        p1: "HORIZON GROUPは、世界を目指す優秀な外国人材と、グローバルな成長を志す日本企業を結ぶ、信頼の架け橋となることを目指しています。",
        p2: "私たちチームメンバーは全員が日本での留学・就労経験があり、その経験と共感を活かし、候補者様と企業様の双方に心からのサポートを提供いたします。",
        about: "私たちについて",
    },
    en: {
        subtitle: "Our Vision",
        p1: "HORIZON GROUP aims to be a trusted bridge between high-potential international talent and Japanese companies pursuing global growth.",
        p2: "Every member of our team has studied and worked in Japan. We use that experience and empathy to support both candidates and companies with care and clarity.",
        about: "About Us",
    },
};

export default function OurVision() {
    const t = useLocalizedCopy(copy);

    return (
        <section className="w-full xl:w-[75%] px-4 sm:px-6 lg:px-8 xl:px-0 mx-auto">
            <div className="flex flex-col xl:flex-row gap-8 xl:gap-16">

                {/* Image */}
                <div className="w-full xl:w-1/2">
                    <img
                        src={OurVisionImg}
                        alt="Our Vision"
                        className="object-cover rounded-xl w-full h-auto shadow-md"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                {/* Content */}
                <div className="w-full xl:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 sec-title">
                        OUR VISION
                    </h2>

                    <h6 className="text-base md:text-lg font-medium mb-8">
                        {t.subtitle}
                    </h6>

                    <p className="text-sm md:text-base mb-3 leading-relaxed">
                        {t.p1}
                    </p>

                    <p className="text-sm md:text-base mb-8 leading-relaxed">
                        {t.p2}
                    </p>

                    <div className="flex justify-start sm:justify-end">
                        <Link
                            to="/about"
                            className="link inline-flex items-center gap-2 text-right text-[#0080FF] hover:text-(--color-primary)!"
                        >
                            {t.about} <FaArrowRight />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}

