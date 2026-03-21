import { Route, Navigate } from "react-router-dom";
import AdminLogin from "../pages/admin/login/AdminLogin";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import JobForm from "../pages/admin/jobs/JobForm";
import JobList from "../pages/admin/jobs/JobList";
import JobView from "../pages/admin/jobs/JobView";
import AdminLayout from "../layouts/AdminLayout";
import RequireAdminAuth from "../pages/admin/auth/RequireAdminAuth";

import PostForm from "../pages/admin/posts/PostForm";
import PostList from "../pages/admin/posts/PostList";
import PostView from "../pages/admin/posts/PostView";

import CandidateContactList from "../pages/admin/candidateContacts/CandidateContactList";
import CompanyContactList from "../pages/admin/companyContacts/CompanyContactList";
import CompanyContactView from "../pages/admin/companyContacts/CompanyContactView";

export const adminRoutes = (
  <>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route element={<RequireAdminAuth />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="candidate-contacts" element={<CandidateContactList />} />
        <Route path="company-contacts" element={<CompanyContactList />} />
        <Route path="company-contacts/:id" element={<CompanyContactView />} />


        <Route path="jobs" element={<JobList />} />
        <Route path="jobs/new" element={<JobForm />} />
        <Route path="jobs/:id/edit" element={<JobForm />} />
        <Route path="jobs/:id" element={<JobView />} />

        <Route path="posts" element={<PostList />} />
        <Route path="posts/new" element={<PostForm />} />
        <Route path="posts/:id/edit" element={<PostForm />} />
        <Route path="posts/:id" element={<PostView />} />
      </Route>
    </Route>
  </>
);
