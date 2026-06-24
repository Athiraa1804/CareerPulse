import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link
} from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Company from "./pages/company";
import Drives from "./pages/drives";
import Reports from "./pages/reports";
import Offers from "./pages/offers";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Students from "./pages/students";
import EditProfile from "./pages/editprofile";


function AppContent() {
  const [profile, setProfile] = useState<any>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [resumeFileName, setResumeFileName] = useState<string>("No resume selected");

  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) return;

  fetch(
    `http://127.0.0.1:5000/api/profile/${studentId}`
  )
    .then((res) => res.json())
    .then((data) => {
      setProfile(data.profile || null);
      setSkills(data.skills || []);
      setInterests(data.interests || []);
    })
    .catch((err) => console.error(err));

}, []);
  const handleResumeUpload = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
    }
  };
  const location = useLocation();

  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/signup";
  return (
  
    <div className="dashboard">

      {/* Sidebar */}
      {!hideSidebar && (
<aside className="sidebar">

        <div className="profile-section">
          <div className="avatar"></div>

          <h2>{profile?.name || "Loading State..."}</h2>
          <p>{profile?.department || "...."}</p>
        </div>

        <div className="menu">

          <Link to="/profile" className="menu-item">
            👤 Profile
          </Link>

          <Link to="/offers" className="menu-item">
            💼 My Offers
          </Link>
           <Link
  to="/edit-profile"
  className="menu-item"
>
  <h2>✏️Edit Profile</h2>
</Link>
          <button
  className="menu-item"
  onClick={() => {
    localStorage.removeItem("student_id");
    window.location.href = "/login";
  }}
>
  🔐 Logout
</button>

        </div>

</aside>
      )}

      {/* Main Content */}
      <main className="main-content">

        <Routes>

          <Route
            path="/"
            element={
              <Dashboard
                onResumeUpload={handleResumeUpload}
                resumeFileName={resumeFileName}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <Profile
                profile={profile}
                skills={skills}
                interests={interests}
                onResumeUpload={handleResumeUpload}
                resumeFileName={resumeFileName}
              />
            }
          />
             <Route
  path="/signup"
  element={<Signup />}
/>
            <Route
              path="/companies"
              element={<Company />}
            />
             <Route
  path="/students"
  element={<Students />}
/>
            <Route
              path="/drives"
              element={<Drives />}
            />
            <Route
  path="/edit-profile"
  element={<EditProfile />}
/>
            <Route
              path="/reports"
              element={<Reports />}
            />
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />
            <Route
              path="/offers"
              element={<Offers />}
            />

          </Routes>

        

      </main>

    </div>
);
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;