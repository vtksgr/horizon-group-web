import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import LogoutButton from "../../../components/admin/LogoutButton";

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

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export default function JobForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [loadingJob, setLoadingJob] = useState(isEditMode);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function mapJobToForm(job) {
        return {
            title: job?.title || "",
            slug: job?.slug || "",
            isUrgent: job?.status === "URGENT_HIRE",
            companyName: job?.companyName || "",
            employmentType: job?.employmentType || "",
            description: job?.description || "",
            skillsRequired: job?.skillsRequired || "",
            workHours: job?.workHours || "",
            holidays: job?.holidays || "",
            salary: job?.salary || "",
            location: job?.location || "",
            interviewDetails: job?.interviewDetails || "",
        };
    }

    useEffect(() => {
        if (!isEditMode) {
            setLoadingJob(false);
            return;
        }

        let mounted = true;

        async function loadJobForEdit() {
            try {
                setLoadingJob(true);
                setError("");

                const stateJob = location.state?.job;
                if (stateJob && String(stateJob.id) === String(id)) {
                    if (mounted) {
                        setFormData(mapJobToForm(stateJob));
                    }
                    return;
                }

                const res = await api.get("/api/admin/jobs", {
                    params: { page: 1, limit: 100 },
                });

                const rows = Array.isArray(res.data?.data) ? res.data.data : [];
                const found = rows.find((item) => String(item.id) === String(id));

                if (!found) {
                    throw new Error("Job not found.");
                }

                if (mounted) {
                    setFormData(mapJobToForm(found));
                }
            } catch (err) {
                if (mounted) {
                    setError(err.message || "Failed to load job for editing.");
                }
            } finally {
                if (mounted) {
                    setLoadingJob(false);
                }
            }
        }

        loadJobForEdit();

        return function cleanup() {
            mounted = false;
        };
    }, [id, isEditMode, location.state]);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => {
            const nextValue = type === "checkbox" ? checked : value;

            if (name === "title") {
                return {
                    ...prev,
                    title: value,
                    slug: slugify(value),
                };
            }

            return {
                ...prev,
                [name]: nextValue,
            };
        });

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

            const payload = {
                ...formData,
                title: formData.title.trim(),
                slug: slugify(formData.slug),
                companyName: formData.companyName.trim(),
                employmentType: formData.employmentType.trim(),
                description: formData.description.trim(),
                skillsRequired: formData.skillsRequired.trim(),
                workHours: formData.workHours.trim(),
                holidays: formData.holidays.trim(),
                salary: formData.salary.trim(),
                location: formData.location.trim(),
                interviewDetails: formData.interviewDetails.trim(),
            };

            if (isEditMode) {
                await api.put("/api/admin/jobs/" + id, payload);
                setSuccess("Job updated successfully.");
                navigate("/admin/jobs/" + id, { replace: true });
                return;
            }

            await api.post("/api/admin/jobs", payload);

            setSuccess("Job created successfully.");
            setFormData(initialForm);
        } catch (err) {
            setError(err.message || (isEditMode ? "Failed to update job." : "Failed to create job."));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-[calc(100vh-3rem)] rounded-2xl bg-slate-100 shadow-sm">
            <div className="flex items-center justify-between rounded-t-2xl bg-slate-900 px-6 py-4">
                <h1 className="text-lg font-semibold text-white">{isEditMode ? "Update Job" : "Create Job"}</h1>
                <LogoutButton />
            </div>

            <div className="px-6 py-10">
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-8 shadow-lg">
                    <div className="mb-8">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700">
                            Admin Panel
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                            Job Form
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            {isEditMode
                                ? "Update job details and save your changes."
                                : "Create and submit a new job posting for the public careers page."}
                        </p>
                    </div>

                    {loadingJob ? (
                        <p className="text-sm text-slate-600">Loading job data...</p>
                    ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">


                        {/* Job Basic Info */}
                        <div className="grid md:grid-cols-2 gap-6">
    
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                />
                            </div>
    
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                />
                            </div>
    
                        </div>
    
                        {/* Employment Info */}
                        <div className="grid md:grid-cols-3 gap-6">
    
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Employment Type
                                </label>
                                <input
                                    type="text"
                                    name="employmentType"
                                    value={formData.employmentType}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
    
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Salary
                                </label>
                                <input
                                    type="text"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
    
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
    
                        </div>
    
                        {/* Work Info */}
                        <div className="grid md:grid-cols-2 gap-6">
    
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Work Hours
                                </label>
                                <input
                                    type="text"
                                    name="workHours"
                                    value={formData.workHours}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
    
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Holidays
                                </label>
                                <input
                                    type="text"
                                    name="holidays"
                                    value={formData.holidays}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
    
                        </div>
    
                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">
                                Job Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
    
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">
                                Skills Required
                            </label>
                            <textarea
                                name="skillsRequired"
                                value={formData.skillsRequired}
                                onChange={handleChange}
                                rows="3"
                                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
    
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">
                                Interview Details
                            </label>
                            <textarea
                                name="interviewDetails"
                                value={formData.interviewDetails}
                                onChange={handleChange}
                                rows="3"
                                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
    
                        {/* Urgent Checkbox */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="isUrgent"
                                checked={formData.isUrgent}
                                onChange={handleChange}
                                className="w-4 h-4 accent-cyan-600"
                            />
                            <span className="text-slate-700 font-medium">
                                Mark as Urgent Hire
                            </span>
                        </div>
    
                        {/* Messages */}
                        {error && (
                            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                                {error}
                            </p>
                        )}
    
                        {success && (
                            <p className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                                {success}
                            </p>
                        )}
    
                        {/* Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading || loadingJob}
                                className="bg-cyan-600 hover:bg-cyan-700 transition text-white font-semibold px-6 py-3 rounded-lg shadow-md"
                            >
                                {loading ? "Saving..." : isEditMode ? "Update Job" : "Create Job"}
                            </button>
                            <div className="mt-3">
                                <Link to="/admin/jobs" className="text-sm text-cyan-700 hover:underline">
                                    Return to Job List
                                </Link>
                            </div>
                        </div>

                    </form>
                    )}
                </div>
            </div>
        </div>
    );
}
