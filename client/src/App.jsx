import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import './App.css'

//Public pages
import Home from "./pages/public/home/Home";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
