import { useState } from "react";
import { z } from "zod";
import { submitCandidateContact } from "../../../api/contactApi";
import Breadcrumbs from "../../../components/ui/breadcrumbs/Breadcrumbs";

const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    postalCode: "",
    address: "",
    inquiryType: "",
    message: "",
    resume: null,
};

const inquiryOptions = [
    { label: "面談・相談", value: "INTERVIEWS_CONSULTATIONS" },
    { label: "人材紹介", value: "RECRUITMENT" },
    { label: "オンライン授業", value: "ONLINE_CLASSES" },
    { label: "セミナー参加", value: "SEMINAR_PARTICIPATION" },
    { label: "就職活動サポート", value: "JOB_HUNTING_SUPPORT" },
    { label: "転職サポート", value: "CAREER_CHANGE_SUPPORT" },
    { label: "その他サポート", value: "OTHER_SUPPORT" },
];

const inputClassName = "w-full rounded-sm border border-gray-300 px-3 py-2 placeholder:text-sm transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-slate-400";

const CandidateContactSchema = z.object({
    firstName: z.string().trim().min(1, "名を入力してください。"),
    lastName: z.string().trim().min(1, "姓を入力してください。"),
    email: z.string().trim().min(1, "メールアドレスを入力してください。").email("正しいメールアドレスを入力してください。"),
    phoneNumber: z.string().trim().min(1, "電話番号を入力してください。"),
    postalCode: z.string().trim().min(1, "郵便番号を入力してください。"),
    address: z.string().trim().min(1, "住所を入力してください。"),
    inquiryType: z.string().trim().min(1, "お問い合わせ種類を選択してください。"),
    message: z.string().trim().min(1, "お問い合わせ内容を入力してください。"),
    resume: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, "履歴書は5MB以下のPDFファイルをアップロードしてください。")
        .refine((file) => file.type === "application/pdf", "履歴書はPDFファイルのみアップロードできます。")
        .optional()
        .nullable(),
});

function normalizeFormData(formData) {
    return Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value])
    );
}

function RequiredBadge() {
    return <span className="ml-1 text-red-500">必須</span>;
}

export default function CandidateContact() {
    const [formData, setFormData] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const breadcrumbsItem = [
        { label: "ホーム", to: "/" },
        { label: "求職者様向けお問い合わせ", to: "/contact_candidate" },
    ];

    function handleChange(event) {
        const { name, value, files } = event.target;

        if (name === "resume") {
            setFormData((prev) => ({ ...prev, resume: files?.[0] || null }));
            setError("");
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSuccess("");

        const normalizedFormData = normalizeFormData(formData);
        const validationResult = CandidateContactSchema.safeParse(normalizedFormData);

        if (!validationResult.success) {
            setError(validationResult.error.issues[0]?.message || "入力内容を確認してください。");
            return;
        }

        try {
            setLoading(true);
            const validatedData = validationResult.data;

            const payload = new FormData();
            payload.append("firstName", validatedData.firstName);
            payload.append("lastName", validatedData.lastName);
            payload.append("email", validatedData.email);
            payload.append("phoneNumber", validatedData.phoneNumber);
            payload.append("postalCode", validatedData.postalCode);
            payload.append("address", validatedData.address);
            payload.append("inquiryType", validatedData.inquiryType);
            payload.append("message", validatedData.message);

            if (validatedData.resume) {
                payload.append("resume", validatedData.resume);
            }

            await submitCandidateContact(payload);
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
                    <p className="font-semibold">お仕事をお探しの方</p>
                </div>
            </section>

            <section>
                <hr className="border-t border-gray-300" />
                <div className="lg:w-[75%] mx-auto px-7 lg:px-0">
                    <Breadcrumbs items={breadcrumbsItem} />
                </div>
            </section>

            <section className="w-full px-4 py-10 flex justify-center">
                <div className="w-full max-w-3xl">
                    <div className="mb-8 lg:pb-9">
                        <h3 className="text-xl font-bold">求職者様へ</h3>
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
                                placeholder="例) example@example.com"
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
                                placeholder="例) 090 1234 5678"
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
                                住所 <RequiredBadge />
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
                            <label className="mb-1 block text-sm font-medium">
                                履歴書PDF
                            </label>
                            <input
                                type="file"
                                name="resume"
                                accept="application/pdf,.pdf"
                                onChange={handleChange}
                                disabled={loading}
                                className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-sm file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700"
                            />
                            <p className="mt-2 text-xs text-slate-500">PDFのみ、5MBまでアップロードできます。</p>
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
                                required
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