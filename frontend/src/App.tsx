import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import StudentLayout from "./layouts/studentlayout";
import AdminLayout from "./layouts/adminlayout";
import AdminReports from "./pages/adminreports";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Company from "./pages/company";
import Drives from "./pages/drives";
import Reports from "./pages/reports";
import Offers from "./pages/offers";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Students from "./pages/students";
import EditProfile from "./pages/editprofile";
import Admin from "./pages/admin";
import AdminCompanies from "./pages/admincompanies";
import AdminStudents from "./pages/adminstudents";
import AdminDrives from "./pages/admindrives";

function App() {

  return (
       <BrowserRouter>

<Routes>

<Route path="/login" element={<Login />} />

<Route path="/signup" element={<Signup />} />

<Route element={<StudentLayout />}>

    <Route path="/" element={<Dashboard />} />

    <Route path="/profile" element={<Profile />} />

    <Route path="/offers" element={<Offers />} />

    <Route path="/edit-profile" element={<EditProfile />} />

    <Route path="/companies" element={<Company />} />

    <Route path="/students" element={<Students />} />

    <Route path="/drives" element={<Drives />} />

    <Route path="/reports" element={<Reports />} />

</Route>

    <Route path="/admin" element={<AdminLayout />}>

    <Route index element={<Admin />} />

    <Route
        path="companies"
        element={<AdminCompanies />}
    />
    <Route
    path="students"
    element={<AdminStudents />}
/>

    <Route
        path="drives"
        element={<AdminDrives />}
    />
    <Route
    path="reports"
    element={<AdminReports />}
/>
    <Route
        path="reports"
        element={<Reports />}
    />
</Route>

</Routes>

</BrowserRouter>
  );

}

export default App;