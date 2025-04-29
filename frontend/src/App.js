import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import DeviceLoginPage from "./pages/DeviceLoginPage";
import ScannerPage from "./pages/ScannerPage";
import RegistrationPage from "./pages/RegistrationPage";
import ResultPage from "./pages/ResultPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<DeviceLoginPage />} />
        <Route path="/scanner" element={<ScannerPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
