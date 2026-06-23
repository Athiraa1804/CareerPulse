
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Reports() {
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/reports")
      .then((res) => res.json())
      .then((data) => setReport(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="data-page">
      <Link to="/">← Back to Dashboard</Link>
      <h1>Reports</h1>
      <div className="report-grid">
        <div className="report-card">
          <p>Total Students</p>
          <h2>{report?.total_students ?? 0}</h2>
        </div>
        <div className="report-card">
          <p>Total Companies</p>
          <h2>{report?.total_companies ?? 0}</h2>
        </div>
        <div className="report-card">
          <p>Average CGPA</p>
          <h2>{report?.avg_cgpa ?? 0}</h2>
        </div>
        <div className="report-card">
          <p>Top Department</p>
          <h2>{report?.top_department ?? "N/A"}</h2>
        </div>
      </div>
    </div>
  );
}

export default Reports;

