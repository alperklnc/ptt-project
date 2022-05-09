import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./views/login-page/Login";
import DoctorPage from "./views/doctor-page/DoctorPage";
import NewPatient from "./views/new-patient/NewPatient";
import PatientPage from "./views/patient-page/PatientPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";

const App: React.FC = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tutorials" element={<TutorialsList />} />
          <Route path="/add" element={<AddTutorial />} />
          <Route path="/tutorials/:id" element={<Tutorial />} />

          <Route path="/doctor-page" element={<DoctorPage />} />
          <Route path="/patient-page" element={<PatientPage />} />
          <Route path="/new-patient" element={<NewPatient />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
