import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { isAdminAuthenticated, setAdminToken } from "../auth/authStorage";
import api from "../../../api/axios";

import Logo from "@assets/images/logo/logo.svg";

export default function AdminLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (isAdminAuthenticated()) {
        return <Navigate to="/admin/dashboard" replace />
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

            setAdminToken(data.token); // token from backend response
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
      <h1 className="text-2xl font-semibold mb-6 text-center text-[var(--color-dark)]">
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
        className="w-full bg-[var(--color-primary)] hover:bg-cyan-700 text-white py-2.5 rounded font-medium transition duration-200 disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  </div>
</div>
        </>
    );
}

