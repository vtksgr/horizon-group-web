import { useEffect, useRef, useState } from "react";


export default function ProgressSection({ className = "" }) {

    const counterSection = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    const counters = [
        { value: 500, sign: "+", label: "卒業生数" },
        { value: 85, sign: "%", label: "就職成功率" },
        { value: 20, sign: "+", label: "対応業種" },
        { value: 15, sign: "", label: "対応言語" },
    ];

    const [displayValues, setDisplayValues] = useState([0, 0, 0, 0]);

    const animateCounters = () => {
        counters.forEach((counter, index) => {
            const startValue = 0;
            const endValue = counter.value;
            const duration = 1500;
            const startTime = performance.now();

            const updateCounter = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentValue = Math.floor(
                    progress * (endValue - startValue) + startValue
                );
                setDisplayValues((prev) => {
                    const update = [...prev];
                    update[index] = currentValue;
                    return update;
                });
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };

            requestAnimationFrame(updateCounter);
        });
    }
    const checkIfInView = () => {
        if (hasAnimated || !counterSection.current) return;

        const rect = counterSection.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom >= 0) {
            animateCounters();
            setHasAnimated(true);
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", checkIfInView)
        checkIfInView();

        return () => {
            window.removeEventListener("scroll", checkIfInView);
        };
    }, [hasAnimated]);
    return (
        <section
            ref={counterSection}
            className={`md:w-[75%] px-4 md:px-0 mx-auto bg-white ${className}`}
        >
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {counters.map((item, index) => {
                    return (
                    <div key={index} className="flex flex-col items-center">
                        <span className="text-6xl font-light text-blue-600">
                            {displayValues[index]}
                            {item.sign && <span>{item.sign}</span>}
                        </span>
                        <span className="text-sm font-semibold text-[#595D61] mt-2">
                            {item.label}
                        </span>
                    </div>
                    );
                })}
            </div>
        </section>
    )
}
