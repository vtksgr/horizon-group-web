import { useState } from "react";
import { submitCompanyContact } from "../../../api/contactApi";
import Breadcrumbs from "../../../components/ui/breadcrumbs/Breadcrumbs";

const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    postalCode: "",
    address: "",
    companyName: "",
    position: "",
    inquiryType: "",
    message: "",
};

const positionOptions = [
    { label: "部長", value: "MANAGER" },
    { label: "課長/マネージャー", value: "SECTION_CHIEF_MANAGER" },
    { label: "主任/係長", value: "CHIEF_SECTION_CHIEF" },
    { label: "一般社員", value: "GENERAL_EMPLOYEE" },
];

const inquiryOptions = [
    { label: "人材紹介", value: "RECRUITMENT" },
    { label: "留学生支援", value: "INTERNATIONAL_STUDENT_SUPPORT" },
    { label: "通訳・翻訳", value: "INTERPRETATION_TRANSLATION" },
    { label: "特定技能", value: "SPECIFIED_SKILLED_WORKER" },
    { label: "登録支援", value: "REGISTRATION_SUPPORT" },
    { label: "教育・コンサルティング", value: "EDUCATION_CONSULTING" },
    { label: "その他のお問い合わせ", value: "OTHER" },
];

const inputClassName = "w-full rounded-sm border border-gray-300 px-3 py-2 placeholder:text-sm transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-slate-400";

function RequiredBadge() {
    return <span className="ml-1 text-red-500">必須</span>;
}

export default function CompanyContact() {
    const [formData, setFormData] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const breadcrumbsItem = [
        { label: "ホーム", to: "/" },
        { label: "企業方へお問い合わせ", to: "/contact_company" },
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

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setError("姓名を入力してください。");
            return;
        }

        if (!formData.email.trim()) {
            setError("メールアドレスを入力してください。");
            return;
        }

        if (!formData.phoneNumber.trim()) {
            setError("電話番号を入力してください。");
            return;
        }

        if (!formData.postalCode.trim() || !formData.address.trim()) {
            setError("郵便番号と会社所在地を入力してください。");
            return;
        }

        if (!formData.companyName.trim()) {
            setError("会社名を入力してください。");
            return;
        }

        if (!formData.position) {
            setError("役職を選択してください。");
            return;
        }

        if (!formData.inquiryType) {
            setError("お問い合わせ種類を選択してください。");
            return;
        }

        if (!formData.message.trim()) {
            setError("お問い合わせ内容を入力してください。");
            return;
        }

        try {
            setLoading(true);
            await submitCompanyContact(formData);
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
            <section className="w-full mt-48">
                <div className="md:w-[75%] mx-auto px-7 lg:px-0 pb-9 page_title">
                    <h1 className="font-semibold">CONTACT</h1>
                    <p className="font-semibold">人材をお探しの企業様</p>
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
                        <h3 className="text-xl font-bold">企業方へ</h3>
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
                                placeholder="例) ○○○株式会社"
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
                                    placeholder="例) 勇気"
                                    disabled={loading}
                                    className={inputClassName}
                                    required
                                />
                            </div>
                        </div>

                        <div className="md:mb-10">
                            <label className="mb-2 block text-sm font-medium">
                                役職 <RequiredBadge />
                            </label>
                            <div className="space-y-2">
                                {positionOptions.map((option) => (
                                    <label key={option.value} className="flex items-center text-sm">
                                        <input
                                            type="radio"
                                            name="position"
                                            value={option.value}
                                            checked={formData.position === option.value}
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
                            <label className="mb-1 block text-sm font-medium">
                                電話番号 <RequiredBadge />
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="例) 050 533 5656"
                                disabled={loading}
                                className={inputClassName}
                                required
                            />
                        </div>

                        <div className="md:mb-10">
                            <label className="mb-1 block text-sm font-medium">
                                郵便番号 <RequiredBadge />
                            </label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                placeholder="例) 105-0014"
                                disabled={loading}
                                className={inputClassName}
                                required
                            />
                        </div>

                        <div className="md:mb-10">
                            <label className="mb-1 block text-sm font-medium">
                                会社所在地 <RequiredBadge />
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="例) 東京都港区芝4丁目2-8"
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
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                placeholder="お問い合わせ内容を入力してください。"
                                disabled={loading}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder:text-sm transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-slate-400"
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center rounded-sm bg-black px-10 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
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
