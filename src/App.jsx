import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Courses from "./Courses";
import MyCourses from "./MyCourses";
import Home from "./Home";
import UserProfile from "./UserProfile";
import CourseDetails from "./CourseDetails";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminGiveAccess from "./Admin/AdminGiveAccess";
import AdminAddAssignments from "./Admin/AdminAddAssignment";   // ✅ NEW
import ProtectedRoute from "./ProtectedRoute";
import UserAssignments from "./UserAssignments";   
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <>
        <Navbar />

        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/mycourses" element={<MyCourses />} />
          <Route path="/assignments" element={<UserAssignments />} /> 
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/courses/:id" element={<CourseDetails />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/access"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminGiveAccess />
              </ProtectedRoute>
            }
          />

          {/* Add Assignments Page */}
          <Route
            path="/admin/assignments"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminAddAssignments /> {/* ✅ NEW */}
              </ProtectedRoute>
            }
          />
        </Routes>

        <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      </>
    </AuthProvider>
  );
}

export default App;
