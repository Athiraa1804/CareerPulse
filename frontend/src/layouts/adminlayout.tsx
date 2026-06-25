import { Outlet, Link, useNavigate } from "react-router-dom";
import "../App.css";
function AdminLayout() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();
        navigate("/login");

    };

    return (

        <div className="dashboard">

            <aside className="sidebar">

                <div className="profile-section">

                    <div className="avatar"></div>

                    <h2>Placement Admin</h2>

                    <p>Administrator</p>

                </div>

                <div className="menu">

                    <Link
                        to="/admin"
                        className="menu-item"
                    >
                        📊 Dashboard
                    </Link>

                    <Link
                        to="/admin/companies"
                        className="menu-item"
                    >
                        🏢 Companies
                    </Link>

                    <Link
                        to="/admin/students"
                        className="menu-item"
                    >
                        👨‍🎓 Students
                    </Link>

                    <Link
                        to="/admin/drives"
                        className="menu-item"
                    >
                        📅 Drives
                    </Link>

                    <Link
                        to="/admin/reports"
                        className="menu-item"
                    >
                        📈 Reports
                    </Link>

                    <button
                        className="menu-item"
                        onClick={logout}
                    >
                        🔐 Logout
                    </button>

                </div>

            </aside>

            <main className="main-content">

                <Outlet />

            </main>

        </div>

    );

}

export default AdminLayout;