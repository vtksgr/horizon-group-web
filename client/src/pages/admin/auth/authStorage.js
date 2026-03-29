import api from "../../../api/axios";

let adminSessionCache = null;

export function setAdminAuthenticated(admin) {
    adminSessionCache = admin || { authenticated: true };
}

export function clearAdminToken() {
    adminSessionCache = null;
}

export function isAdminAuthenticated() {
    return Boolean(adminSessionCache);
}

export async function fetchAdminSession() {
    try {
        const { data } = await api.get("/api/admin/session");
        adminSessionCache = data?.admin || { authenticated: true };
        return adminSessionCache;
    } catch (error) {
        adminSessionCache = null;
        return null;
    }
}
