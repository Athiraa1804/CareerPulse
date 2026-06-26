import { useEffect, useState } from "react";
import "./admincompanies.css";

function AdminDrives() {

    const [drives, setDrives] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);

    const [editingDrive, setEditingDrive] = useState<any>(null);

    const [companies, setCompanies] = useState<any[]>([]);

    const [formData, setFormData] = useState({
    company_id: "",
    drive_date: "",
    min_cgpa: "",
    job_role: ""
});

    useEffect(() => {

        fetch("http://127.0.0.1:5000/api/admin/drives")
            .then((res) => res.json())
            .then((data) => setDrives(data));
        fetch("http://127.0.0.1:5000/api/admin/company-list")
           .then((res) => res.json())
            .then((data) => {
            setCompanies(data);
    });
    }, []);
const handleDelete = async (driveId: number) => {

    const confirmDelete = window.confirm(
        "Delete this drive?"
    );

    if (!confirmDelete) return;

    const response = await fetch(
        `http://127.0.0.1:5000/api/admin/drive/${driveId}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    alert(data.message);

    setDrives(
        drives.filter(
            drive => drive.drive_id !== driveId
        )
    );
};
const handleSaveDrive = async () => {

    let url =
        "http://127.0.0.1:5000/api/admin/drive";

    let method = "POST";

    if (editingDrive) {

        url =
            `http://127.0.0.1:5000/api/admin/drive/${editingDrive.drive_id}`;

        method = "PUT";
    }

    const response = await fetch(
        url,
        {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
    );

    const data = await response.json();

    alert(data.message);

    setShowModal(false);

    fetch(
        "http://127.0.0.1:5000/api/admin/drives"
    )
        .then((res) => res.json())
        .then((data) => setDrives(data));
};
    return (

    <div className="drive-page">

        <h1 className="portal-title">
            Manage Placement Drives
        </h1>

        <div className="drive-header">

            <button
                className="add-company-btn"
                onClick={() => {

                    setEditingDrive(null);

                    setFormData({
                        company_id: "",
                        drive_date: "",
                        min_cgpa: "",
                        job_role: ""
                    });

                    setShowModal(true);

                }}
            >
                + Add Drive
            </button>

        </div>

        <div className="company-grid">

            {drives.map((drive) => (

                <div
                    key={drive.drive_id}
                    className="company-card"
                >

                    <h2>{drive.company_name}</h2>

                    <p>
                        <b>Role:</b> {drive.job_role}
                    </p>

                    <p>
                        <b>Drive Date:</b>{" "}
                        {new Date(
                            drive.drive_date
                        ).toLocaleDateString("en-IN")}
                    </p>

                    <p>
                        <b>Minimum CGPA:</b> {drive.min_cgpa}
                    </p>

                    <div className="company-actions">

                        <button
                            className="edit-btn"
                            onClick={() => {

                                setEditingDrive(drive);

                                setFormData({
                                    company_id: drive.company_id,
                                    drive_date: drive.drive_date,
                                    min_cgpa: drive.min_cgpa,
                                    job_role: drive.job_role
                                });

                                setShowModal(true);

                            }}
                        >
                            ✏ Edit
                        </button>
<button
    className="delete-btn"
    onClick={() =>
        handleDelete(drive.drive_id)
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
                        {editingDrive
                            ? "Edit Drive"
                            : "Add Drive"}
                    </h2>

                    <select
                        value={formData.company_id}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                company_id: e.target.value
                            })
                        }
                    >

                        <option value="">
                            Select Company
                        </option>

                        {companies.map((company) => (

                            <option
                                key={company.company_id}
                                value={company.company_id}
                            >
                                {company.company_name}
                            </option>

                        ))}

                    </select>

                    <input
                        type="date"
                        value={formData.drive_date}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                drive_date: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Minimum CGPA"
                        value={formData.min_cgpa}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                min_cgpa: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Job Role"
                        value={formData.job_role}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                job_role: e.target.value
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
                            onClick={handleSaveDrive}
                        >
                            {editingDrive
                                ? "Update Drive"
                                : "Save Drive"}
                        </button>

                    </div>

                </div>

            </div>

        )}

    </div>

);
}
export default AdminDrives;