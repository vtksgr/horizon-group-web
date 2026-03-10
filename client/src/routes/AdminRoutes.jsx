import { Route, Navigate } from "react-router-dom";
import AdminLogin from "../pages/admin/login/AdminLogin";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import JobForm from "../pages/admin/jobs/JobForm";
import AdminLayout from "../layouts/AdminLayout";
import RequireAdminAuth from "../pages/admin/auth/RequireAdminAuth";


export const adminRoutes = (
  <>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route element={<RequireAdminAuth />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="jobs/new" element={<JobForm />} />
      </Route>
    </Route>
  </>
);
