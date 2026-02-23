import { z } from "zod";

const jobCreateSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string()
        .min(1, "Slug is required")
        .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphen-separated"),
    isUrgent: z.boolean().optional(),
    companyName: z.string().optional(),
    employmentType: z.string().optional(),
    description: z.string().optional(),
    skillsRequired: z.string().optional(),
    workHours: z.string().optional(),
    holidays: z.string().optional(),
    salary: z.string().optional(),
    location: z.string().optional(),
    interviewDetails: z.string().optional()
}).transform((data) => {
    // Transform isUrgent to status enum
    if (data.isUrgent !== undefined) {
        data.status = data.isUrgent ? "URGENT_HIRE" : "VACANCY_AVAILABLE";
        delete data.isUrgent;
    }
    return data;
});

const validateJob = (data) => {
    return jobCreateSchema.parse(data);
};

export default validateJob;