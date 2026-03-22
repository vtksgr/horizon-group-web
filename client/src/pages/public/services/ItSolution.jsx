import Breadcrumbs from "../../../components/ui/breadcrumbs/Breadcrumbs";
import { Link } from "react-router-dom";
import { HiLightBulb, HiDesktopComputer, HiUserGroup, HiClock, HiSupport, HiGlobeAlt, HiTerminal, HiColorSwatch, HiTrendingUp, HiDocumentText, HiViewGrid, HiChartBar, HiLightningBolt, HiArrowUp, HiShieldCheck, HiBadgeCheck } from "react-icons/hi";
import { FaRocket } from "react-icons/fa";

const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "IT Solution", to: "/it_solution" },
];

export default function ItSolution() {

    return (
        <>
            {/* Page title */}
            <section className="w-full mt-32 border-b border-gray-300">
                <div className="lg:w-[75%] mx-auto px-8 lg:px-0 pb-8 page_title">
                    <h1 className="font-semibold">IT SOLUTION</h1>
                    <h6 className="font-semibold text-(--color-text-secondary)">IT Solution</h6>
                </div>
            </section>
            {/* breadcrumbs */}
            <section>
                <div className="lg:w-[75%] mx-auto px-8 lg:px-0">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
            </section>
            {/* page hero */}
            <section className=" py-10 lg:py-16 mt-10">
                <div className="lg:w-[75%] mx-auto px-8 lg:px-0">
                    <div>
                        <p className="flex items-center gap-4 text-[24px] font-bold mb-6">
                            <span className="w-8 h-0.5 bg-(--color-primary) shrink-0" />
                            <span className="text-(--color-dark)">HORIZON</span>
                            <span className="text-(--color-primary)">WEB STUDIO</span>
                        </p>

                        <h2 className="font-black leading-[1.05] text-[44px] sm:text-[58px] lg:text-[128px] text-(--color-dark)">
                            <span className="block">Build, Grow &</span>
                            <span className="block text-(--color-primary)">Scale Your</span>
                            <span className="block text-(--color-primary)">Business</span>
                        </h2>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                            <span className="font-black leading-[1.05] text-[44px] sm:text-[58px] lg:text-[128px] text-(--color-dark)">Online</span>
                            {/* cta */}
                            <div className="flex flex-col gap-4 sm:items-end shrink-0">
                                <Link
                                    to="/contact_it_solution"
                                    className="w-full sm:w-55 border border-(--color-dark) bg-(--color-dark) px-6 py-4 text-center text-white text-sm sm:text-base font-medium hover:bg-(--color-dark) transition-colors"
                                >
                                    Free Consultation
                                </Link>
                                <Link
                                    to="/posts"
                                    className="w-full sm:w-55 border border-(--color-primary) bg-white px-6 py-4 text-center text-(--color-dark) text-sm sm:text-base font-medium hover:bg-[#f2fbff] transition-colors"
                                >
                                    Start Today
                                </Link>
                            </div>
                        </div>

                        <p className="mt-8 max-w-170 text-sm sm:text-base text-(--text-color) leading-relaxed">Websites, Web Apps, Digital Marketing & IT Support — Everything You Need in One Place.</p>
                    </div>

                    <div className="mt-10 lg:mt-14 border-t border-(--color-border) pt-6 lg:pt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                        <div className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full border border-(--color-primary)" />
                            <span className="w-8 h-8 rounded-full border border-(--color-primary)" />
                            <span className="w-8 h-8 rounded-full border border-(--color-primary)" />
                            <span className="w-8 h-8 rounded-full border border-(--color-primary)" />
                        </div>
                        <p className="text-xs sm:text-base text-(--text-color)">Helping startups, local businesses & growing companies succeed online.</p>
                    </div>
                </div>
            </section>
            {/* Struggling */}
            <section className="py-16 lg:py-24">
                <div className="lg:w-[75%] mx-auto px-8 lg:px-0">
                    <span className="inline-block bg-(--color-primary) text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
                        Sound Familiar
                    </span>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                        {/* Left — pain points */}
                        <div>
                            <h3 className="font-black text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.1] text-(--color-dark) mb-10">
                                Struggling to<br />Grow Your<br />Business<br />Online?
                            </h3>

                            <ul className="space-y-4">
                                {[
                                    { icon: <HiDesktopComputer size={20} />, text: "No website or an embarrassingly outdated design" },
                                    { icon: <HiUserGroup size={20} />, text: "Not getting enough customers from the internet" },
                                    { icon: <HiClock size={20} />, text: "Complex manual processes wasting your time & money" },
                                    { icon: <HiSupport size={20} />, text: "No reliable tech support when critical things break" },
                                ].map((item) => (
                                    <li key={item.text} className="flex items-center gap-4 bg-[#f5f6f7] px-6 py-4 rounded-md">
                                        <span className="w-7 h-7 shrink-0 rounded bg-[#3d4247] flex items-center justify-center text-white">
                                            {item.icon}
                                        </span>
                                        <span className="text-sm text-(--color-dark)">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right — solution card */}
                        <div className="border border-[#c8e8f8] bg-[#eef7fd] rounded-2xl p-8 lg:p-10 flex flex-col gap-6">
                            {/* bulb icon */}
                            <HiLightBulb size={48} aria-hidden="true" className="text-amber-400" />

                            <span className="inline-block bg-(--color-primary) text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full w-fit">
                                Our Solution
                            </span>

                            <h4 className="font-black text-[28px] sm:text-[34px] leading-[1.15] text-(--color-dark)">
                                One Partner. Total<br />Digital<br />Transformation.
                            </h4>

                            <p className="text-sm text-(--color-text-secondary) leading-relaxed">
                                We provide complete digital solutions — from building your website to marketing and ongoing support — so you can focus on running your business, not fighting with technology.
                            </p>

                            <Link
                                to="/contact_it_solution"
                                className="inline-block bg-(--color-dark) text-white text-sm font-semibold px-8 py-4 hover:bg-(--color-dark) transition-colors w-fit"
                            >
                                Let's Talk
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
            {/* What we do */}
            <section className="bg-[#f0f1f2] py-16 lg:py-24">
                <div className="lg:w-[75%] mx-auto px-8 lg:px-0">

                    {/* header */}
                    <div className="text-center mb-12">
                        <span className="inline-block bg-(--color-primary) text-white text-xs font-semibold tracking-widest uppercase px-6 py-2 rounded-full mb-6">
                            What We Do
                        </span>
                        <h3 className="font-black text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.15] text-(--color-dark) mb-4">
                            We Help Businesses Get<br />More Customers Online
                        </h3>
                        <p className="text-sm text-(--text-color) max-w-xl mx-auto">
                            Five core service areas — completely integrated — so nothing falls through the cracks.
                        </p>
                    </div>

                    {/* service cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <HiGlobeAlt size={36} className="text-gray-400" />,
                                title: "Website & E-Commerce Development",
                                items: [
                                    "WordPress websites that convert visitors",
                                    "Shopify stores that actually sell",
                                    "Responsive & SEO-friendly design",
                                ],
                            },
                            {
                                icon: <HiTerminal size={36} className="text-gray-400" />,
                                title: "Custom Web & App Development",
                                items: [
                                    "React, Vue, Node.js development",
                                    "Booking & reservation systems",
                                    "Business automation tools",
                                ],
                            },
                            {
                                icon: <HiColorSwatch size={36} className="text-gray-400" />,
                                title: "Design & Branding",
                                items: [
                                    "Website UI/UX design",
                                    "High-converting landing pages",
                                    "Brand identity & style guides",
                                ],
                            },
                            {
                                icon: <HiTrendingUp size={36} className="text-gray-400" />,
                                title: "Digital Marketing & SEO",
                                items: [
                                    "SEO setup & optimization",
                                    "Social media marketing",
                                    "Google, YouTube & Facebook Ads",
                                ],
                            },
                            {
                                icon: <HiSupport size={36} className="text-gray-400" />,
                                title: "IT Support & Consulting",
                                items: [
                                    "Website maintenance & updates",
                                    "Hosting & technical support",
                                    "Business tech consultation",
                                ],
                            },
                            {
                                icon: <HiDocumentText size={36} className="text-gray-400" />,
                                title: "Design & Print",
                                items: [
                                    "Poster",
                                    "Business card",
                                    "Pamphlet",
                                ],
                            },
                        ].map((card) => (
                            <div key={card.title} className="bg-white rounded-xl p-6 flex flex-col gap-4 shadow-sm">
                                <div className="w-14 h-14 rounded-lg bg-[#e8eaec] flex items-center justify-center shrink-0">
                                    {card.icon}
                                </div>
                                <h5 className="font-bold text-[15px] text-(--color-dark) leading-snug">{card.title}</h5>
                                <ul className="space-y-2">
                                    {card.items.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-sm text-(--color-text-secondary)">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-(--color-primary) shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
            {/* Sound Familiar */}
            <section className="py-16 lg:py-24">
                <div className="lg:w-[75%] mx-auto px-8 lg:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* Left — steps */}
                        <div>
                            <span className="inline-block bg-(--color-primary) text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
                                Sound Familiar
                            </span>
                            <h3 className="font-black text-[36px] sm:text-[48px] leading-[1.1] text-(--color-dark) mb-10">
                                Simple Process.<br />Real Results.
                            </h3>

                            <ol className="space-y-6">
                                {[
                                    { n: 1, title: "Consultation", desc: "We listen first. Understand your business, your goals, and your audience." },
                                    { n: 2, title: "Planning", desc: "Strategy, design direction & technology stack selected for your needs." },
                                    { n: 3, title: "Development", desc: "We build your website or app with regular check-ins and updates." },
                                    { n: 4, title: "Launch & Marketing", desc: "Go live with confidence — then we amplify your reach online." },
                                    { n: 5, title: "Support & Growth", desc: "Continuous optimization, maintenance, and improvement for long-term success." },
                                ].map((step) => (
                                    <li key={step.n} className="flex items-start gap-4">
                                        <span className="w-7 h-7 shrink-0 rounded-full bg-[#e8eaec] flex items-center justify-center text-xs font-bold text-(--color-text-secondary)">
                                            {step.n}
                                        </span>
                                        <div>
                                            <p className="font-bold text-(--color-dark) text-sm mb-0.5">{step.title}</p>
                                            <p className="text-sm text-(--text-color)">{step.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Right — growth engine card */}
                        <div className="border border-[#c8e8f8] bg-[#eef7fd] rounded-2xl p-10 flex flex-col items-center text-center gap-6">
                            {/* orbital diagram */}
                            <div className="relative flex items-center justify-center w-56 h-56">
                                {/* outer orbit ring */}
                                <span className="absolute w-52 h-52 rounded-full border border-dashed border-(--color-primary)/50" />
                                {/* orbit dots */}
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-(--color-primary)" />
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-(--color-primary)" />
                                <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-(--color-primary)" />
                                <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-(--color-primary)" />
                                {/* center circle */}
                                <span className="w-24 h-24 rounded-full bg-(--color-primary) flex items-center justify-center shadow-lg">
                                    <FaRocket size={36} className="text-white" />
                                </span>
                            </div>

                            <h4 className="font-black text-[22px] text-(--color-dark)">Your Growth Engine</h4>
                            <p className="text-sm text-(--color-text-secondary) leading-relaxed">
                                Strategy → Build → Market → Scale<br />
                                A full cycle built around your success.
                            </p>
                            <Link
                                to="/contact_it_solution"
                                className="bg-(--color-dark) text-white text-sm font-semibold px-8 py-4 hover:bg-(--color-dark) transition-colors"
                            >
                                Start Today
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
            {/* OUR ADVANTAGE */}
            <section className="bg-[#f0f1f2] py-16 lg:py-24">
                <div className="lg:w-[75%] mx-auto px-8 lg:px-0">

                    <span className="inline-block bg-(--color-primary) text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
                        Our Advantage
                    </span>
                    <h3 className="font-black text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.1] text-(--color-dark) mb-4">
                        Why Businesses Choose Us
                    </h3>
                    <p className="text-sm sm:text-base text-(--text-color) mb-12">
                        We’re not just a vendor — we’re a growth partner invested in your success.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            {
                                icon: <HiViewGrid size={28} className="text-gray-400" />,
                                title: "All-in-One Solution",
                                desc: "No juggling multiple vendors. One team handles everything from design to deployment to marketing.",
                            },
                            {
                                icon: <HiChartBar size={28} className="text-gray-400" />,
                                title: "Business-Focused Approach",
                                desc: "We don’t just build pretty sites — every decision is tied to your business outcomes and ROI.",
                            },
                            {
                                icon: <HiLightningBolt size={28} className="text-gray-400" />,
                                title: "Fast, Responsive Communication",
                                desc: "You’ll always know what’s happening. Clear updates, no ghosting, no excuses.",
                            },
                            {
                                icon: <HiArrowUp size={28} className="text-gray-400" />,
                                title: "Affordable & Scalable",
                                desc: "Startup pricing with enterprise thinking. Solutions that grow as your business grows.",
                            },
                            {
                                icon: <HiShieldCheck size={28} className="text-gray-400" />,
                                title: "Long-Term Support",
                                desc: "We’re here after launch. Ongoing maintenance, updates, and growth guidance built in.",
                            },
                            {
                                icon: <HiBadgeCheck size={28} className="text-gray-400" />,
                                title: "Proven Track Record",
                                desc: "200+ successful projects across industries. Our results speak for themselves.",
                            },
                        ].map((card) => (
                            <div key={card.title} className="bg-white rounded-xl p-6 flex items-start gap-4 shadow-sm">
                                <div className="w-12 h-12 rounded-lg bg-[#e8eaec] flex items-center justify-center shrink-0">
                                    {card.icon}
                                </div>
                                <div>
                                    <h5 className="font-bold text-[15px] text-(--color-dark) mb-2">{card.title}</h5>
                                    <p className="text-sm text-(--text-color) leading-relaxed">{card.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
            {/* Impact we delivery */}
            <section className="py-16 lg:py-24">
                <div className="lg:w-[75%] mx-auto px-8 lg:px-0 text-center">

                    <span className="inline-block bg-(--color-primary) text-white text-xs font-semibold tracking-widest uppercase px-6 py-2 rounded-full mb-8">
                        Impact We Deliver
                    </span>

                    <h3 className="font-black text-[36px] sm:text-[52px] lg:text-[64px] leading-[1.1] text-(--color-dark) mb-6">
                        We Don't Just Build —<br />We Help You Grow
                    </h3>

                    <p className="text-sm sm:text-base text-(--text-color) mb-14">
                        Tangible outcomes your business actually cares about.
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { stat: "100%", label: "Average increase in online visibility", icon: <HiGlobeAlt size={18} className="text-white" /> },
                            { stat: "90%", label: "More qualified leads generated", icon: <HiUserGroup size={18} className="text-white" /> },
                            { stat: "40%", label: "Time saved via automation", icon: <HiClock size={18} className="text-white" /> },
                            { stat: "40%", label: "Client satisfaction rate", icon: <HiBadgeCheck size={18} className="text-white" /> },
                        ].map((item) => (
                            <div key={item.label} className="border border-[#c8e8f8] bg-[#eef7fd] rounded-xl p-6 flex flex-col items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-[#b0b8c1] flex items-center justify-center">{item.icon}</span>
                                <p className="font-black text-[32px] sm:text-[40px] text-(--color-primary) leading-none">{item.stat}</p>
                                <p className="text-xs sm:text-sm text-(--color-text-secondary) text-center leading-snug">{item.label}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
            {/* Lets work together */}
            <section className="py-20 lg:py-28">
                <div className="lg:w-[75%] mx-auto px-8 lg:px-0 text-center">
                    <span className="inline-block bg-(--color-primary) text-white text-xs font-semibold tracking-widest uppercase px-6 py-2 rounded-full mb-10">
                        Let's Work Together
                    </span>

                    <h3 className="font-black text-[48px] sm:text-[64px] lg:text-[72px] leading-[1.1] text-(--color-dark) mb-10">
                        Ready to Grow Your<br />Business?
                    </h3>

                    <p className="text-base sm:text-[28px] text-(--text-color) max-w-140 mx-auto leading-relaxed mb-14">
                        Let's build something that brings real results. Your first consultation is completely free.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <Link
                            to="/contact_it_solution"
                            className="w-full sm:w-55 border border-(--color-dark) bg-(--color-dark) px-6 py-4 text-center text-white text-sm sm:text-base font-medium hover:bg-(--color-dark) transition-colors"
                        >
                            Free Consultation
                        </Link>
                        <Link
                            to="/posts"
                            className="w-full sm:w-55 border border-(--color-primary) bg-white px-6 py-4 text-center text-(--color-dark) text-sm sm:text-base font-medium hover:bg-[#f2fbff] transition-colors"
                        >
                            View Our Work
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
