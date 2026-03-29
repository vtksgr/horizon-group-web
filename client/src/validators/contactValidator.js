import { z } from 'zod';

export const CompanyContactSchema = z.object({
    companyName: z.string().min(1, 'Company name required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone required'),
    inquiry: z.string().min(1, 'Please select an inquiry type'),
});

export const CandidateContactSchema = z.object({
    firstName: z.string().min(1, 'First name required'),
    lastName: z.string().min(1, 'Last name required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone required'),
    resume: z.instanceof(File).refine(
        f => f.size < 5000000,
        'File must be less than 5MB'
    ).refine(
        f => f.type === 'application/pdf',
        'Only PDF files allowed'
    ),
});