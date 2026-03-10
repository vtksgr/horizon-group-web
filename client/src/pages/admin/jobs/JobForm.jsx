import { useState } from "react";
import api from "../../../api/axios";

const initialForm = {
    title: "",
    slug: "",
    isUrgent: false,
    companyName: "",
    employmentType: "",
    description: "",
    skillsRequired: "",
    workHours: "",
    holidays: "",
    salary: "",
    location: "",
    interviewDetails: "",
};

export default function JobForm() {
    const [formData, setFormData] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setError("");
        setSuccess("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!formData.title.trim() || !formData.slug.trim()) {
            setError("Title and slug are required.");
            return;
        }

        try {
            setLoading(true);

            await api.post("/api/admin/jobs", {
                ...formData,
                title: formData.title.trim(),
                slug: formData.slug.trim(),
                companyName: formData.companyName.trim(),
                employmentType: formData.employmentType.trim(),
                description: formData.description.trim(),
                skillsRequired: formData.skillsRequired.trim(),
                workHours: formData.workHours.trim(),
                holidays: formData.holidays.trim(),
                salary: formData.salary.trim(),
                location: formData.location.trim(),
                interviewDetails: formData.interviewDetails.trim(),
            });

            setSuccess("Job created successfully.");
            setFormData(initialForm);
        } catch (err) {
            setError(err.message || "Failed to create job.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
            <h1 className="text-2xl font-semibold mb-6">Create Job</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                <input
                    type="text"
                    name="slug"
                    placeholder="Slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                <input
                    type="text"
                    name="employmentType"
                    placeholder="Employment Type"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    rows="4"
                />

                <textarea
                    name="skillsRequired"
                    placeholder="Skills Required"
                    value={formData.skillsRequired}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    rows="3"
                />

                <input
                    type="text"
                    name="workHours"
                    placeholder="Work Hours"
                    value={formData.workHours}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                <input
                    type="text"
                    name="holidays"
                    placeholder="Holidays"
                    value={formData.holidays}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                <input
                    type="text"
                    name="salary"
                    placeholder="Salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                <textarea
                    name="interviewDetails"
                    placeholder="Interview Details"
                    value={formData.interviewDetails}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    rows="3"
                />

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isUrgent"
                        checked={formData.isUrgent}
                        onChange={handleChange}
                    />
                    Urgent Hire
                </label>

                {error ? <p className="text-red-600 text-sm">{error}</p> : null}
                {success ? <p className="text-green-600 text-sm">{success}</p> : null}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-cyan-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Saving..." : "Create Job"}
                </button>
            </form>
        </div>
    );
}
