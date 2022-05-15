import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./views/pages/LoginPage";
import DoctorPage from "./views/pages/DoctorPage";
import NewPatientPage from "./views/pages/NewPatientPage";
import PatientPage from "./views/pages/PatientPage";
import ExercisePage from "./views/pages/ExercisePage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/doctor-page" element={<DoctorPage />} />
          <Route path="/patient-page" element={<PatientPage />} />
          <Route path="/exercise-page" element={<ExercisePage />} />
          <Route path="/new-patient" element={<NewPatientPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
