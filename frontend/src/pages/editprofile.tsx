import { useState } from "react";

function EditProfile() {

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");

  const handleSave = async () => {
      console.log("SAVE BUTTON CLICKED");
    const studentId =
      localStorage.getItem("student_id");
    console.log(studentId);

    const response = await fetch(
      "http://127.0.0.1:5000/api/profile/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          student_id: studentId,
          name,
          department,
          phone,
          cgpa,
          graduation_year: graduationYear,
          skills,
          interests
        })
      }
    );
    console.log(response);

    const data = await response.json();

    if (data.success) {
      alert("Profile Updated!");
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1 className="portal-title">
          Complete Profile
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="number"
          placeholder="CGPA"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
        />

        <input
          type="number"
          placeholder="Graduation Year"
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
        />

        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <input
          type="text"
          placeholder="Interests (comma separated)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />

        <button
          className="login-btn"
          onClick={handleSave}
        >
          Save Profile
        </button>

      </div>

    </div>
  );
}

export default EditProfile;