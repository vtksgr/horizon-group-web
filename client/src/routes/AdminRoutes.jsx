import { lazy, Suspense } from "react";
import { Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import RequireAdminAuth from "../pages/admin/auth/RequireAdminAuth";

const AdminLogin = lazy(() => import("../pages/admin/login/AdminLogin"));
const Dashboard = lazy(() => import("../pages/admin/dashboard/Dashboard"));
const JobForm = lazy(() => import("../pages/admin/jobs/JobForm"));
const JobList = lazy(() => import("../pages/admin/jobs/JobList"));
const JobView = lazy(() => import("../pages/admin/jobs/JobView"));
const PostForm = lazy(() => import("../pages/admin/posts/PostForm"));
const PostList = lazy(() => import("../pages/admin/posts/PostList"));
const PostView = lazy(() => import("../pages/admin/posts/PostView"));
const CandidateContactList = lazy(() => import("../pages/admin/candidateContacts/CandidateContactList"));
const CompanyContactList = lazy(() => import("../pages/admin/companyContacts/CompanyContactList"));
const CompanyContactView = lazy(() => import("../pages/admin/companyContacts/CompanyContactView"));
const ItSolutionContactList = lazy(() => import("../pages/admin/itSolutionContacts/ItSolutionContactList"));
const ItSolutionContactView = lazy(() => import("../pages/admin/itSolutionContacts/ItSolutionContactView"));

function withSuspense(element) {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-600">Loading...</div>}>
      {element}
    </Suspense>
  );
}

export const adminRoutes = (
  <>
    <Route path="/admin/login" element={withSuspense(<AdminLogin />)} />
    <Route element={<RequireAdminAuth />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={withSuspense(<Dashboard />)} />

        <Route path="candidate-contacts" element={withSuspense(<CandidateContactList />)} />
        <Route path="company-contacts" element={withSuspense(<CompanyContactList />)} />
        <Route path="company-contacts/:id" element={withSuspense(<CompanyContactView />)} />
        <Route path="it-solution-contacts" element={withSuspense(<ItSolutionContactList />)} />
        <Route path="it-solution-contacts/:id" element={withSuspense(<ItSolutionContactView />)} />


        <Route path="jobs" element={withSuspense(<JobList />)} />
        <Route path="jobs/new" element={withSuspense(<JobForm />)} />
        <Route path="jobs/:id/edit" element={withSuspense(<JobForm />)} />
        <Route path="jobs/:id" element={withSuspense(<JobView />)} />

        <Route path="posts" element={withSuspense(<PostList />)} />
        <Route path="posts/new" element={withSuspense(<PostForm />)} />
        <Route path="posts/:id/edit" element={withSuspense(<PostForm />)} />
        <Route path="posts/:id" element={withSuspense(<PostView />)} />
      </Route>
    </Route>
  </>
);
