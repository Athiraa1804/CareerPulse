import { useEffect, useState } from "react";
import "./adminstudents.css";

function AdminStudents() {
    const [students, setStudents] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);

    const [editingStudent, setEditingStudent] = useState<any>(null);

   const [formData, setFormData] = useState({
    name: "",
    department: "",
    cgpa: "",
    email: "",
    phone: "",
    graduation_year: ""
});

    useEffect(() => {

        fetch("http://127.0.0.1:5000/api/admin/students")
            .then((res) => res.json())
            .then((data) => {
                setStudents(data);
            });
    }, []);
    const handleDelete = async (studentId: number) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    const response = await fetch(

        `http://127.0.0.1:5000/api/admin/student/${studentId}`,

        {
            method: "DELETE"
        }

    );

    const data = await response.json();

    alert(data.message);

    setStudents((prevStudents) =>
        prevStudents.filter(
            student => student.student_id !== studentId
        )
    );
};

const handleSaveStudent = async () => {

    const response = await fetch(

        `http://127.0.0.1:5000/api/admin/student/${editingStudent.student_id}`,

        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(formData)
        }
    );

    const data = await response.json();

    alert(data.message);

    setShowModal(false);

    fetch("http://127.0.0.1:5000/api/admin/students")
        .then((res) => res.json())
        .then((data) => setStudents(data));
};
return (

    <div className="student-page">

        <h1 className="portal-title">
            Manage Students
        </h1>

        <div className="student-grid">

            {students.map((student) => (

                <div
                    key={student.student_id}
                    className="student-card"
                >

                    <h2>{student.name}</h2>

                    <p><b>Department:</b> {student.department}</p>

                    <p><b>CGPA:</b> {student.cgpa}</p>

                    <p><b>Email:</b> {student.email}</p>

                    <p><b>Phone:</b> {student.phone}</p>

                    <p><b>Graduation:</b> {student.graduation_year}</p>

                    <div className="student-actions">
<button
    className="edit-btn"
    onClick={() => {

        setEditingStudent(student);

        setFormData({
            name: student.name || "",
            department: student.department || "",
            cgpa: student.cgpa || "",
            email: student.email || "",
            phone: student.phone || "",
            graduation_year: student.graduation_year || ""
        });

        setShowModal(true);

    }}
>
    ✏ Edit
</button>

                        <button
    className="delete-btn"
    onClick={() => {
        alert("DELETE CLICKED");
        handleDelete(student.student_id);
    }}
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

                    <h2>Edit Student</h2>

                    <input
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Department"
                        value={formData.department}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                department: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="CGPA"
                        value={formData.cgpa}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                cgpa: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                phone: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Graduation Year"
                        value={formData.graduation_year}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                graduation_year: e.target.value
                            })
                        }
                    />

                    <div className="modal-buttons">

                        <button
                            className="delete-btn"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>

                        <button
                            className="add-company-btn"
                            onClick={handleSaveStudent}
                        >
                            Update Student
                        </button>

                    </div>

                </div>

            </div>

        )}

    </div>

);
}
export default AdminStudents;