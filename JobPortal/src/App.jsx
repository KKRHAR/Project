// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
// import UploadJob from "./components/UploadJob"; 
import YourProfile from "./components/YourProfile";
import JobSearch from "./components/SearchJob";
import UploadJob from './components/UploadJob';
function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to Register */}
        <Route path="/" element={<RegisterForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/uploadjob" element={<UploadJob />} /> Corrected */}
        <Route path="/your-profile" element={<YourProfile />} />
        <Route path="/search" element={<JobSearch />} />
        <Route path='/uploadjob' element={<UploadJob/>}/>

      </Routes>
    </Router>
  );
}

export default App;
