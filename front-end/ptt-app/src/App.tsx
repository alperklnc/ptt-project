import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login-page/Login";
import DoctorPage from "./components/doctor-page/DoctorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/doctor-page" element={<DoctorPage />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
