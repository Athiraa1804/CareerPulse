
import { Link } from "react-router-dom";

function BackButton() {
  return (
    <Link to="/" className="back-button" aria-label="Go back to dashboard">
      ← Back to Dashboard
    </Link>
  );
}

function Profile({ profile, skills, interests, onResumeUpload, resumeFileName }: any) {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div>
          <BackButton />
          <p className="profile-eyebrow">Student Profile</p>
          <h1>{profile?.name || "Loading profile..."}</h1>
        </div>
        <span className="profile-status">Active</span>
      </div>

      <div className="profile-layout">
        <section className="card profile-card">
          <div className="profile-avatar-large">{profile?.name?.charAt(0) || "U"}</div>
          <h2>{profile?.name || "Student Name"}</h2>
          <p className="profile-role">{profile?.department || "Department"} Student</p>

          <div className="profile-info-grid">
            <div>
              <span className="info-label">CGPA</span>
              <p>{profile?.cgpa || "-"}</p>
            </div>
            <div>
              <span className="info-label">Email</span>
              <p>{profile?.email || "-"}</p>
            </div>
            <div>
              <span className="info-label">Phone</span>
              <p>{profile?.phone || "-"}</p>
            </div>
          </div>
        </section>

        <section className="card profile-section-card resume-upload-card">
          <h3>Resume</h3>
          <div className="resume-upload-inline">
            <label className="resume-upload-btn profile-upload-btn">
              <input type="file" accept=".pdf,.doc,.docx" onChange={onResumeUpload} />
              <span>Attach Resume</span>
            </label>
            <span className="resume-file-name">{resumeFileName}</span>
          </div>
        </section>

        <section className="card profile-section-card">
          <h3>Skills</h3>
          <div className="tag-list">
            {skills?.length > 0 ? (
              skills.map((skill: string, index: number) => (
                <span key={`${skill}-${index}`} className="tag">{skill}</span>
              ))
            ) : (
              <span className="tag empty-tag">No skills listed</span>
            )}
          </div>
        </section>

        <section className="card profile-section-card">
          <h3>Interests</h3>
          <div className="tag-list">
            {interests?.length > 0 ? (
              interests.map((interest: string, index: number) => (
                <span key={`${interest}-${index}`} className="tag interest-tag">{interest}</span>
              ))
            ) : (
              <span className="tag empty-tag">No interests listed</span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
export default Profile;