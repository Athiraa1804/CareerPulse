
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Companies() {
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="data-page">
      {/* <BackButton /> */}
      <Link to="/">← Back to Dashboard</Link>
      <h1>Companies</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Package</th>
              <th>Location</th>
              <th>Industry</th>
              <th>Cutoff</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={`${company.company_name}-${index}`}>
                <td>{company.company_name}</td>
                <td>{company.role}</td>
                <td>{company.package}</td>
                <td>{company.location}</td>
                <td>{company.industry}</td>
                <td>{company.cutoff_cgpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Companies;