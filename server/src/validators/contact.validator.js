import { z } from "zod";

const emailField = z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format");

const phoneField = z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9\-+() ]+$/, "Invalid phone number");

const baseFields = {
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: emailField,
    phoneNumber: phoneField,
    postalCode: z.string().min(1, "Postal code is required"),
    address: z.string().min(1, "Address is required"),
    message: z.string().min(1, "Message is required"),
};

const validateByType = (type, data) => {
    if (type === "CANDIDATE") {
        return z
            .object({
                ...baseFields,
                inquiryType: z.string().min(1, "Inquiry type is required"),
                resumeUrl: z.string().optional(),
            })
            .parse(data);
    }

    if (type === "COMPANY") {
        return z
            .object({
                ...baseFields,
                companyName: z.string().min(1, "Company name is required"),
                position: z.string().min(1, "Position is required"),
                inquiryType: z.string().min(1, "Inquiry type is required"),
            })
            .parse(data);
    }
    throw new Error("Invalid contact type");
};

export default validateByType;
