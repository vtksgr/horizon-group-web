import api from "./axios";


//Admin
export async function getAdminPosts(params = {}) {
    const res = await api.get("/api/admin/posts", { params });
    return res.data;
    
}
export async function getAdminPostById(id) {
  const res = await api.get(`/api/admin/posts/${id}`);
  return res.data;
}

export async function getAdminPostCategories() {
    const res = await api.get("/api/admin/posts/categories");
    return res.data;
}

//Public
export async function getPublicPosts(params = {}) {
    const res = await api.get("/api/posts", { params });
    return res.data;
}

export async function getPublicPostById(id) {
    const res = await api.get(`/api/posts/${id}`);
    return res.data;
}

export async function createPost(formData) {
    const res = await api.post("/api/admin/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
}

export async function updatePost(id, formData) {
    const res = await api.put(`/api/admin/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
}

export async function deletePost(id) {
    const res = await api.delete(`/api/admin/posts/${id}`);
    return res.data;
}
