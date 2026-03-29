import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PublicRouteSkeleton from "../components/ui/loading/PublicRouteSkeleton";

const Home = lazy(() => import("../pages/public/home/Home"));
const Careers = lazy(() => import("../pages/public/services/Careers"));
const CompanyProfile = lazy(() => import("../pages/public/profile/CompanyProfile"));
const PrivacyPolicy = lazy(() => import("../pages/public/policies/PrivacyPolicy"));
const Faq = lazy(() => import("../pages/public/services/Faq"));
const Jobs = lazy(() => import("../pages/public/services/Jobs"));
const Post = lazy(() => import("../pages/public/post/Post"));
const PostDetail = lazy(() => import("../pages/public/post/PostDetail"));
const CompanyContact = lazy(() => import("../pages/public/contacts/CompanyContact"));
const CandidateContact = lazy(() => import("../pages/public/contacts/CandidateContact"));
const ItSolutionContact = lazy(() => import("../pages/public/contacts/ItSolutionContact"));
const ItSolution = lazy(() => import("../pages/public/services/ItSolution"));
const Greeting = lazy(() => import("../pages/public/profile/Greeting"));
const NotFound = lazy(() => import("../pages/public/errors/NotFound"));

function withSuspense(element) {
	return (
		<Suspense fallback={<PublicRouteSkeleton />}>
			{element}
		</Suspense>
	);
}

export const publicRoutes = (
	<Route element={<PublicLayout />}>
		<Route path="/" element={withSuspense(<Home />)} />
		<Route path="/career_academy" element={withSuspense(<Careers />)} />
		<Route path="/company_profile" element={withSuspense(<CompanyProfile />)} />
		<Route path="/greeting" element={withSuspense(<Greeting />)} />
		<Route path="/privacy_policy" element={withSuspense(<PrivacyPolicy />)} />
		<Route path="/faq" element={withSuspense(<Faq />)} />
		<Route path="/jobs" element={withSuspense(<Jobs />)} />
		<Route path="/posts" element={withSuspense(<Post />)} />
		<Route path="/posts/:id" element={withSuspense(<PostDetail />)} />
        <Route path="/contact_company" element={withSuspense(<CompanyContact />)} />
		<Route path="/contact_candidate" element={withSuspense(<CandidateContact />)} />
		<Route path="/contact_it_solution" element={withSuspense(<ItSolutionContact />)} />
		<Route path="/it_solution" element={withSuspense(<ItSolution />)} />
		<Route path="*" element={withSuspense(<NotFound />)} />
	</Route>
);
