import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>

      {/* ADMIN LINKS */}
      {user?.role === "admin" && (
        <>
          <Link to="/admin">Admin Dashboard</Link>
          <Link to="/admin/access">Give Access</Link>

          {/* NEW: Admin Add Assignments Page */}
          <Link to="/admin/assignments">Add Assignments</Link>
        </>
      )}

      {/* USER LINKS */}
      {user?.role === "user" && (
        <>
          <Link to="/courses">Courses</Link>
          <Link to="/mycourses">My Courses</Link>
          <Link to="/assignments">Assignments</Link>
          <Link to="/profile">Profile</Link>
        </>
      )}

      {/* PUBLIC LINKS */}
      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {/* LOGOUT BUTTON */}
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
