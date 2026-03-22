import api from "./axios";

export async function submitCompanyContact(formData) {
    const res = await api.post("/api/contacts/company", formData);
    return res.data;
}

export async function submitCandidateContact(formData) {
    // Let the browser set the multipart boundary automatically.
    const res = await api.post("/api/contacts/candidate", formData);
    return res.data;
}

export async function submitItSolutionContact(formData) {
    const res = await api.post("/api/contacts/itsolution", formData);
    return res.data;
}