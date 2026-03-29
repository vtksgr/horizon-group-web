import { useNavigate } from "react-router-dom";
import { clearAdminToken } from "../../pages/admin/auth/authStorage";
import api from "../../api/axios";

const defaultClassName =
  "rounded bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)]";

export default function LogoutButton({
  className = defaultClassName,
  children = "Logout",
}) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await api.post("/api/admin/logout");
    } catch {
      // Ignore network/logout errors and clear client state anyway.
    } finally {
      clearAdminToken();
      navigate("/admin/login", { replace: true });
    }
  }

  return (
    <button type="button" onClick={handleLogout} className={className}>
      {children}
    </button>
  );
}
