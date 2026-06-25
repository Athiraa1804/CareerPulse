import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import StudentLayout from "./layouts/studentlayout";
import AdminLayout from "./layouts/adminlayout";

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

<Route element={<AdminLayout />}>

    <Route path="/admin" element={<Admin />} />
    <Route path="/admin/companies" element={<AdminCompanies />} />

</Route>

</Routes>

</BrowserRouter>
  );

}

export default App;