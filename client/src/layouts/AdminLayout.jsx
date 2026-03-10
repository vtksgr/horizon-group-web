import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <Outlet />
    </div>
  );
}
