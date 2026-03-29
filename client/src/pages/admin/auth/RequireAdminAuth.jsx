import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { fetchAdminSession, isAdminAuthenticated } from "./authStorage";

export default function RequireAdminAuth() {
    const location = useLocation();
    const [checkingSession, setCheckingSession] = useState(!isAdminAuthenticated());
    const [authenticated, setAuthenticated] = useState(isAdminAuthenticated());

    useEffect(() => {
        let mounted = true;

        async function checkSession() {
            const admin = await fetchAdminSession();

            if (mounted) {
                setAuthenticated(Boolean(admin));
                setCheckingSession(false);
            }
        }

        if (!authenticated) {
            checkSession();
        } else {
            setCheckingSession(false);
        }

        return () => {
            mounted = false;
        };
    }, [authenticated, location.pathname]);

    if (checkingSession) {
        return <div className="p-6 text-sm text-slate-600">Checking admin session...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}
