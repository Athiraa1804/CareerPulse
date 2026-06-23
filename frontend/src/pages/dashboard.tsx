
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ onResumeUpload, resumeFileName }: any) {
  const navigate = useNavigate();

  useEffect(() => {
    const student_id = localStorage.getItem("student_id");
    if (!student_id) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <h1 className="page-title">CareerPulse</h1>

      <div className="cards-grid">

        <Link to="/profile" className="card card-link">
          <h2>Profile</h2>
          <p>Manage profile details</p>
        </Link>

        <Link to="/students" className="card card-link">
          <h2>Students</h2>
          <p>Explore student records</p>
        </Link>

        <Link to="/companies" className="card card-link">
          <h2>Companies</h2>
          <p>Explore companies</p>
        </Link>

        <Link to="/drives" className="card card-link">
          <h2>Placement Drives</h2>
          <p>Upcoming recruitment drives</p>
        </Link>

        <Link to="/reports" className="card card-link">
          <h2>Reports</h2>
          <p>Placement analytics</p>
        </Link>

        <div className="card resume-card">
          <h2>Resume</h2>
          <p>Upload & manage resume</p>
          <label className="resume-upload-btn">
            <input type="file" accept=".pdf,.doc,.docx" onChange={onResumeUpload} />
            <span>Attach File</span>
          </label>
          <p className="resume-file-name">{resumeFileName}</p>
        </div>

      </div>
    </>
    
  );
}

export default Dashboard;