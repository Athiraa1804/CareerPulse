import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {

    const navigate = useNavigate();

    useEffect(() => {

        const role = localStorage.getItem("role");

        if (role !== "admin") {

            navigate("/");

        }

    }, []);

    return (

        <div>

            <h1>Admin Dashboard</h1>

            <p>Welcome Admin</p>

        </div>

    );

}

export default Admin;


