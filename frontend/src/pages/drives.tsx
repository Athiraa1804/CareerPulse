
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Drives() {
  const [drives, setDrives] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/drives")
      .then((res) => res.json())
      .then((data) => setDrives(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="data-page">
      <Link to="/">← Back to Dashboard</Link>
      <h1>Placement Drives</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Drive ID</th>
              <th>Company</th>
              <th>Drive Date</th>
              <th>Min CGPA</th>
              <th>Job Role</th>
            </tr>
          </thead>
          <tbody>
            {drives.map((drive) => (
              <tr key={drive.drive_id}>
                <td>{drive.drive_id}</td>
                <td>{drive.company_name}</td>
                <td>{drive.drive_date}</td>
                <td>{drive.min_cgpa}</td>
                <td>{drive.job_role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Drives;
