import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/login-page/Login";
import DoctorPage from "./views/doctor-page/DoctorPage";
import NewPatient from "./views/new-patient/NewPatient";
import PatientPage from "./views/patient-page/PatientPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/doctor-page" element={<DoctorPage />} />
        <Route path="/patient-page" element={<PatientPage />} />
        <Route path="/new-patient" element={<NewPatient />} />
      </Routes>
    </Router>
  );
}

export default App;
