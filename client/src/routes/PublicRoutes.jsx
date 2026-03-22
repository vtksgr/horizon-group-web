import { Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/public/home/Home";
import Careers from "../pages/public/services/Careers";
import CompanyProfile from "../pages/public/profile/CompanyProfile";
import PrivacyPolicy from "../pages/public/policies/PrivacyPolicy";
import Faq from "../pages/public/services/Faq";
import Jobs from "../pages/public/services/Jobs";
import Post from "../pages/public/post/Post";
import PostDetail from "../pages/public/post/PostDetail";
import CompanyContact from "../pages/public/contacts/CompanyContact";
import CandidateContact from "../pages/public/contacts/CandidateContact";
import ItSolutionContact from "../pages/public/contacts/ItSolutionContact";
import ItSolution from "../pages/public/services/ItSolution";

export const publicRoutes = (
	<Route element={<PublicLayout />}>
		<Route path="/" element={<Home />} />
		<Route path="/career_academy" element={<Careers />} />
		<Route path="/company_profile" element={<CompanyProfile />} />
		<Route path="/privacy_policy" element={<PrivacyPolicy />} />
		<Route path="/faq" element={<Faq />} />
		<Route path="/jobs" element={<Jobs />} />
		<Route path="/posts" element={<Post />} />
		<Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/contact_company" element={<CompanyContact />} />
		<Route path="/contact_candidate" element={<CandidateContact />} />
		<Route path="/contact_it_solution" element={<ItSolutionContact />} />
		<Route path="/it_solution" element={<ItSolution />} />

	</Route>
);
