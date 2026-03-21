import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import { adminRoutes } from "./routes/AdminRoutes";
import { publicRoutes } from "./routes/PublicRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes}
        {adminRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
