import { useEffect, useState } from "react";
import slugify from "../utils/slugify";
import { createPost, updatePost } from "../api/postApi";

const initialForm = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    categoryId: "",
    status: "DRAFT",
    banner: null,
    bannerImg: "",
};

function normalizeContent(value) {
    return String(value || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export default function usePostForm({ initialData = null, postId = null, onSuccess }) {
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [slugTouched, setSlugTouched] = useState(false);
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        if (!initialData) return;

        setFormData({
            title: initialData.title || "",
            slug: initialData.slug || "",
            excerpt: initialData.excerpt || "",
            content: initialData.content || "",
            categoryId: String(initialData.categoryId || ""),
            status: initialData.status || "DRAFT",
            banner: null,
            bannerImg: initialData.bannerImg || "",
        });

        setImagePreview(initialData.bannerImg || "");
        setSlugTouched(Boolean(initialData.slug));
    }, [initialData]);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => {
            if (name === "title") {
                return {
                    ...prev,
                    title: value,
                    slug: slugTouched ? prev.slug : slugify(value),
                };
            }

            if (name === "slug") {
                setSlugTouched(true);
                return { ...prev, slug: slugify(value) };
            }

            return { ...prev, [name]: value };
        });

        setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    function handleImageChange(e) {
        const file = e.target.files?.[0] || null;
        if (!file) return;

        setFormData((prev) => ({ ...prev, banner: file }));
        setImagePreview(URL.createObjectURL(file));
    }

    function removeImage() {
        setFormData((prev) => ({ ...prev, banner: null, bannerImg: "" }));
        setImagePreview("");
    }

    function validate() {
        const nextErrors = {};
        const contentText = normalizeContent(formData.content);

        if (!formData.title.trim()) nextErrors.title = "Title is required.";
        if (!formData.slug.trim()) nextErrors.slug = "Slug is required.";
        if (contentText.length < 10) nextErrors.content = "Content must be at least 10 characters.";
        if (!String(formData.categoryId || "").trim()) nextErrors.categoryId = "Category is required.";

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    function toFormData() {
        const payload = new FormData();
        payload.append("title", formData.title.trim());
        payload.append("slug", slugify(formData.slug));
        payload.append("excerpt", formData.excerpt.trim());
        payload.append("content", String(formData.content || "").trim());
        payload.append("categoryId", String(formData.categoryId));
        payload.append("status", formData.status);

        if (formData.banner) {
            payload.append("banner", formData.banner);
        }

        return payload;
    }

    async function submit() {
        if (!validate()) return false;

        try {
            setLoading(true);
            const payload = toFormData();

            const result = postId
                ? await updatePost(postId, payload)
                : await createPost(payload);

            if (onSuccess) onSuccess(result);
            return true;
        } finally {
            setLoading(false);
        }
    }

    return {
        formData,
        errors,
        loading,
        imagePreview,
        handleChange,
        handleImageChange,
        removeImage,
        submit,
        setFormData,
    };
}
