import { useNavigate } from "react-router-dom";
import { clearAdminToken } from "../../pages/admin/auth/authStorage";

const defaultClassName =
  "rounded bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600";

export default function LogoutButton({
  className = defaultClassName,
  children = "Logout",
}) {
  const navigate = useNavigate();

  function handleLogout() {
    clearAdminToken();
    navigate("/admin/login", { replace: true });
  }

  return (
    <button type="button" onClick={handleLogout} className={className}>
      {children}
    </button>
  );
}
