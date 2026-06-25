import { useEffect, useState } from "react";
import "./admincompanies.css";

function AdminCompanies() {

    const [companies, setCompanies] = useState<any[]>([]);

    const [showModal, setShowModal] = useState(false);

    const [editingCompany, setEditingCompany] = useState<any>(null);

    const [formData, setFormData] = useState({
        company_name: "",
        role: "",
        package: "",
        location: "",
        industry: "",
        cutoff_cgpa: ""
    });

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/admin/companies")
            .then((res) => res.json())
            .then((data) => {
                setCompanies(data);
            });
    },
    []);

    const handleDelete = async (companyId: number) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this company?"
        );

        if (!confirmDelete) return;

        const response = await fetch(
            `http://127.0.0.1:5000/api/admin/company/${companyId}`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();

        alert(data.message);

        setCompanies((prevCompanies) =>
            prevCompanies.filter(
                (company) => company.company_id !== companyId
            )
        );
    };
    const handleSaveCompany = async () => {

    let url = "http://127.0.0.1:5000/api/admin/company";
    let method = "POST";

    if (editingCompany) {
        url = `http://127.0.0.1:5000/api/admin/company/${editingCompany.company_id}`;
        method = "PUT";
    }

    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const data = await response.json();

    alert(data.message);

    setShowModal(false);

    fetch("http://127.0.0.1:5000/api/admin/companies")
        .then((res) => res.json())
        .then((data) => setCompanies(data));

}; 

    return (
        <div className="company-page">

            <h1 className="portal-title">
                Manage Companies
            </h1>

            <div className="company-header">

                <button
                    className="add-company-btn"
                    onClick={() => {

                        setEditingCompany(null);

                        setFormData({
                            company_name: "",
                            role: "",
                            package: "",
                            location: "",
                            industry: "",
                            cutoff_cgpa: ""
                        });

                        setShowModal(true);

                    }}
                >
                    + Add Company
                </button>

            </div>

            <div className="company-grid">

                {companies.map((company) => (

                    <div
                        key={company.company_id}
                        className="company-card"
                    >

                        <h2>{company.company_name}</h2>

                        <p><b>Role:</b> {company.role}</p>

                        <p><b>Package:</b> ₹{company.package} LPA</p>

                        <p><b>Location:</b> {company.location}</p>

                        <p><b>Industry:</b> {company.industry}</p>

                        <p><b>CGPA Cutoff:</b> {company.cutoff_cgpa}</p>

                        <div className="company-actions">

                            <button
                                className="edit-btn"
                                onClick={() => {

                                    setEditingCompany(company);

                                    setFormData({
                                        company_name: company.company_name,
                                        role: company.role,
                                        package: company.package,
                                        location: company.location,
                                        industry: company.industry,
                                        cutoff_cgpa: company.cutoff_cgpa
                                    });

                                    setShowModal(true);

                                }}
                            >
                                ✏ Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    handleDelete(company.company_id)
                                }
                            >
                                🗑 Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {showModal && (

                <div className="modal-overlay">

                    <div className="company-modal">

                        <h2>

                            {editingCompany
                                ? "Edit Company"
                                : "Add Company"}

                        </h2>

                        <input
                            placeholder="Company Name"
                            value={formData.company_name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    company_name: e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Role"
                            value={formData.role}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    role: e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Package"
                            value={formData.package}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    package: e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Location"
                            value={formData.location}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    location: e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Industry"
                            value={formData.industry}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    industry: e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="CGPA Cutoff"
                            value={formData.cutoff_cgpa}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    cutoff_cgpa: e.target.value
                                })
                            }
                        />

                        <div className="modal-buttons">

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    setShowModal(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="add-company-btn"
                                onClick={handleSaveCompany}
                            >
                                {editingCompany
                                    ? "Update Company"
                                    : "Save Company"}
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default AdminCompanies;