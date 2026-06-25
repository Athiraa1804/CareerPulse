import "../App.css";
import { useEffect, useState } from "react";
import {
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom";

function StudentLayout() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [resumeFileName, setResumeFileName] =
    useState("No resume selected");

  useEffect(() => {

    const studentId = localStorage.getItem("student_id");

    if (!studentId) {
      navigate("/login");
      return;
    }

    fetch(`http://127.0.0.1:5000/api/profile/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile || null);
        setSkills(data.skills || []);
        setInterests(data.interests || []);
      })
      .catch(console.error);

  }, []);

  const handleResumeUpload = (event: any) => {

    const file = event.target.files?.[0];

    if (file) {
      setResumeFileName(file.name);
    }

  };

  return (

    <div className="dashboard">

      <aside className="sidebar">

        <div className="profile-section">

          <div className="avatar"></div>

          <h2>{profile?.name || "Loading User..."}</h2>

          <p>{profile?.department || "..."}</p>

        </div>

        <div className="menu">

          <Link
            to="/profile"
            className="menu-item"
          >
            👤 Profile
          </Link>

          <Link
            to="/offers"
            className="menu-item"
          >
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
              localStorage.clear();
              navigate("/login");
            }}
          >
            🔐 Logout
          </button>

        </div>

      </aside>

      <main className="main-content">

        <Outlet
          context={{
            profile,
            skills,
            interests,
            resumeFileName,
            handleResumeUpload
          }}
        />

      </main>

    </div>

  );

}

export default StudentLayout;