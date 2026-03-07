import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css'

//Public pages
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/public/home/Home";
import Careers from "./pages/public/Careers";
import CompanyProfile from "./pages/public/CompanyProfile";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";
import FAQ from "./pages/public/FAQ";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/career_academy" element={<Careers />} />
          <Route path="/company_profile" element={<CompanyProfile />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
