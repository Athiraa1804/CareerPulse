
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Offers() {
  const [offers, setOffers] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/offers")
      .then((res) => res.json())
      .then((data) => setOffers(data))
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {

  const studentId =
    localStorage.getItem("student_id");

  fetch(
    `http://127.0.0.1:5000/api/eligible-companies/${studentId}`
  )
    .then(res => res.json())
    .then(data => setCompanies(data));

}, []);
  return (
    <div className="data-page">
      <Link to="/">← Back to Dashboard</Link>
      <h1>My Offers</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Offer ID</th>
              <th>Company</th>
              <th>Package</th>
              <th>Offer Date</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.offer_id}>
                <td>{offer.offer_id}</td>
                <td>{offer.company_name}</td>
                <td>{offer.package}</td>
                <td>{offer.offer_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1 className="page-title">
  Companies You Can Apply For
</h1>

<p className="offers-subtitle">
  Based on your CGPA and profile
</p>
      <div className="offers-grid">

  {companies.map((company:any) => (

    <div
      className="offer-card"
      key={company.company_id}
    >

      <div className="offer-header">

        <h3>{company.company_name}</h3>

        <span className="eligible-badge">
          Eligible
        </span>

      </div>

      <p>
        <strong>Role:</strong>
        {" "}
        {company.role}
      </p>

      <p>
        <strong>Package:</strong>
        {" "}
        ₹{company.package} LPA
      </p>

      <p>
        <strong>Location:</strong>
        {" "}
        {company.location}
      </p>

      <p>
        <strong>CGPA Cutoff:</strong>
        {" "}
        {company.cutoff_cgpa}
      </p>

      <button className="apply-btn">
        Apply Now
      </button>

    </div>

  ))}

</div>
    </div>
    
  );
}
export default Offers;