import { useEffect, useState } from "react";
import "./adminreports.css";

function AdminReports() {

    const [report, setReport] = useState<any>({});

    useEffect(() => {

        fetch(
            "http://127.0.0.1:5000/api/admin/reports"
        )
        .then(res => res.json())
        .then(data => setReport(data));

    }, []);

    return (

        <div className="report-page">

            <h1 className="portal-title">
                Placement Reports
            </h1>

            <div className="report-grid">

                <div className="report-card">
                    <h2>{report.students}</h2>
                    <p>Total Students</p>
                </div>

                <div className="report-card">
                    <h2>{report.companies}</h2>
                    <p>Total Companies</p>
                </div>

                <div className="report-card">
                    <h2>{report.drives}</h2>
                    <p>Total Drives</p>
                </div>

                <div className="report-card">
                    <h2>{report.applications}</h2>
                    <p>Applications</p>
                </div>

                <div className="report-card">
                    <h2>{report.offers}</h2>
                    <p>Offers</p>
                </div>

                <div className="report-card">
                    <h2>{report.placement_rate}%</h2>
                    <p>Placement Rate</p>
                </div>

            </div>

        </div>

    );

}

export default AdminReports;