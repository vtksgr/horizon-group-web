import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { fetchAdminSession, isAdminAuthenticated, setAdminAuthenticated } from "../auth/authStorage";
import api from "../../../api/axios";

import Logo from "@assets/images/logo/logo.svg";

export default function AdminLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [checkingSession, setCheckingSession] = useState(!isAdminAuthenticated());

    useEffect(() => {
      let mounted = true;

      async function hydrateSession() {
        const admin = await fetchAdminSession();

        if (mounted && admin) {
          setAdminAuthenticated(admin);
        }

        if (mounted) {
          setCheckingSession(false);
        }
      }

      if (!isAdminAuthenticated()) {
        hydrateSession();
      } else {
        setCheckingSession(false);
      }

      return () => {
        mounted = false;
      };
    }, []);

    if (isAdminAuthenticated()) {
        return <Navigate to="/admin/dashboard" replace />
    }

    if (checkingSession) {
      return <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 text-sm text-slate-600">Checking admin session...</div>;
    }

    const redirectTo = location.state?.from?.pathname || "/admin/dashboard";

    async function onSubmit(e) {
        e.preventDefault();
        setError("");

        const normalizedIdentifier = identifier.trim();

        if (!normalizedIdentifier || !password) {
            setError("Username or email and password are required.");
            return;
        }

        try {
            setLoading(true);

            const loginPayload = normalizedIdentifier.includes("@")
                ? { email: normalizedIdentifier, password }
                : { username: normalizedIdentifier, password };

            const { data } = await api.post("/api/admin/login", loginPayload);

            setAdminAuthenticated(data.admin);
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(err.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
<div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
  <div className="w-full max-w-md">

    {/* Logo */}
    <div className="flex justify-center mb-6">
      <img src={Logo} alt="Horizon Group logo" className="h-20 w-auto" />
    </div>

    {/* Card */}
    <form
      onSubmit={onSubmit}
      className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg"
    >
      <h1 className="mb-6 text-center text-2xl font-semibold text-(--color-dark)">
        Admin Login
      </h1>

      {/* Username */}
      <input
        className="w-full border border-slate-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition"
        type="text"
        placeholder="Username or Email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />

      {/* Password */}
      <input
        className="w-full border border-slate-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Error */}
      {error ? (
        <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
      ) : null}

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-(--color-primary) py-2.5 font-medium text-white transition duration-200 hover:bg-cyan-700 disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <Link
        to="/"
        className="mt-4 block text-center text-sm font-medium text-slate-600 transition hover:text-slate-900"
      >
        Return to home page
      </Link>
    </form>
  </div>
</div>
        </>
    );
}

