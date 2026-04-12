import { useState } from "react";
import { submitItSolutionContact } from "../../../api/contactApi";
import Breadcrumbs from "../../../components/ui/breadcrumbs/Breadcrumbs";

const initialForm = {
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    inquiryType: "",
    message: "",
};

const inquiryOptions = [
    { label: "Web Development", value: "WEB_DEVELOPMENT" },
    { label: "Design and Branding", value: "DESIGN_AND_BRANDING" },
    { label: "Digital Marketing & SEO", value: "DIGITAL_MARKETING_SEO" },
    { label: "IT Support & Consulting", value: "IT_SUPPORT_CONSULTING" },
    { label: "Design Print", value: "DESIGN_PRINT" },
    { label: "Others", value: "OTHERS" },
];

const inputClassName = "w-full rounded-sm border border-gray-300 px-3 py-2 placeholder:text-sm transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-slate-400";

function RequiredBadge() {
    return <span className="ml-1 text-red-500">必須</span>;
}

export default function ItSolutionContact() {
    const [formData, setFormData] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const breadcrumbsItem = [
        { label: "ホーム", to: "/" },
        { label: "ITソリューション", to: "/it_solution" },
        { label: "ITソリューションお問い合わせ", to: "/contact_it_solution" },
    ];

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!formData.companyName.trim()) {
            setError("会社名を入力してください。");
            return;
        }

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setError("姓名を入力してください。");
            return;
        }

        if (!formData.email.trim()) {
            setError("メールアドレスを入力してください。");
            return;
        }

        if (!formData.inquiryType) {
            setError("お問い合わせ種類を選択してください。");
            return;
        }

        if (!formData.message.trim()) {
            setError("お問い合わせ詳細を入力してください。");
            return;
        }

        try {
            setLoading(true);
            await submitItSolutionContact(formData);
            setSuccess("送信が完了しました。担当者よりご連絡いたします。");
            setFormData(initialForm);
        } catch (err) {
            setError(err.message || "送信に失敗しました。時間をおいて再度お試しください。");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <section className="w-full mt-32">
                <div className="md:w-[75%] mx-auto px-7 lg:px-0 pb-9 page_title">
                    <h1 className="font-semibold">CONTACT</h1>
                    <p className="font-semibold">ITソリューションに関するお問い合わせ</p>
                </div>
            </section>

            <section>
                <hr className="border-t border-gray-300" />
                <div className="lg:w-[75%] mx-auto px-7 lg:px-0">
                    <Breadcrumbs items={breadcrumbsItem} />
                </div>
            </section>

            <section className="flex w-full justify-center px-4 py-10">
                <div className="w-full max-w-3xl">
                    <div className="mb-8 lg:pb-9">
                        <h3 className="text-xl font-bold">ITソリューション</h3>
                        <p className="text-sm text-gray-600">MAIL FORM メールでのお問い合わせ</p>
                    </div>

                    {error ? (
                        <div className="mb-6 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    ) : null}

                    {success ? (
                        <div className="mb-6 rounded-sm border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            {success}
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="md:mb-10">
                            <label className="mb-1 block text-sm font-medium">
                                会社名 <RequiredBadge />
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="例) Horizon Group"
                                disabled={loading}
                                className={inputClassName}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:mb-10 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    姓 <RequiredBadge />
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="例) 山田"
                                    disabled={loading}
                                    className={inputClassName}
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    名 <RequiredBadge />
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="例) 太郎"
                                    disabled={loading}
                                    className={inputClassName}
                                    required
                                />
                            </div>
                        </div>

                        <div className="md:mb-10">
                            <label className="mb-1 block text-sm font-medium">
                                メールアドレス <RequiredBadge />
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="例) example@horizongroup.co.jp"
                                disabled={loading}
                                className={inputClassName}
                                required
                            />
                        </div>

                        <div className="md:mb-10">
                            <label className="mb-2 block text-sm font-medium">
                                お問い合わせ種類 <RequiredBadge />
                            </label>
                            <div className="space-y-2">
                                {inquiryOptions.map((option) => (
                                    <label key={option.value} className="flex items-center text-sm">
                                        <input
                                            type="radio"
                                            name="inquiryType"
                                            value={option.value}
                                            checked={formData.inquiryType === option.value}
                                            onChange={handleChange}
                                            disabled={loading}
                                            className="mr-2 transition duration-300 ease-in-out focus:ring focus:ring-slate-400"
                                            required
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="md:mb-10">
                            <label className="mb-1 block text-sm font-medium">
                                お問い合わせ詳細 <RequiredBadge />
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={6}
                                placeholder="お問い合わせ詳細を入力してください。"
                                disabled={loading}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder:text-sm transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-slate-400"
                                required
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center bg-black px-10 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "送信中..." : "送信する"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}