import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // ---------------- USER STATE ----------------
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });


  // ---------------- REGISTER ----------------
  const registerUser = (newUser) => {
    localStorage.setItem(
      `user-${newUser.email}`,
      JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: "user",
        courses: [],
        assignments: {}       // IMPORTANT
      })
    );

    alert("Registered Successfully!");
  };


  // ---------------- LOGIN ----------------
  const login = (email, password) => {
    if (email === "admin@gmail.com") {
      const adminUser = {
        name: "Admin",
        email: "admin@gmail.com",
        role: "admin"
      };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return;
    }

    const registeredUser = JSON.parse(localStorage.getItem(`user-${email}`));

    if (!registeredUser) {
      alert("User not found! Register first.");
      return;
    }

    if (registeredUser.password !== password) {
      alert("Wrong password!");
      return;
    }

    setUser(registeredUser);
    localStorage.setItem("user", JSON.stringify(registeredUser));
  };


  // ---------------- LOGOUT ----------------
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };


  // ---------------------------------------------------------
  // 🟩 ADMIN: ADD ASSIGNMENT TO A COURSE
  // ---------------------------------------------------------
  const addAssignment = (courseName, assignmentObj) => {
    const storedAssignments =
      JSON.parse(localStorage.getItem("assignments")) || {};

    if (!storedAssignments[courseName]) storedAssignments[courseName] = [];

    storedAssignments[courseName].push(assignmentObj);
    localStorage.setItem("assignments", JSON.stringify(storedAssignments));

    alert("Assignment added successfully!");
  };


  // ---------------------------------------------------------
  // 🟦 WHEN USER ENROLLS → Load assignments for that course
  // ---------------------------------------------------------
  const loadAssignmentsForUser = (email, courses) => {
    const storedAssignments =
      JSON.parse(localStorage.getItem("assignments")) || {};

    const updated = JSON.parse(localStorage.getItem(`user-${email}`));

    updated.assignments = updated.assignments || {};

    courses.forEach((course) => {
      if (storedAssignments[course]) {
        updated.assignments[course] = storedAssignments[course].map(a => ({
          ...a,
          completed: false
        }));
      }
    });

    localStorage.setItem(`user-${email}`, JSON.stringify(updated));
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
  };


  // ---------------------------------------------------------
  // 🟨 UPDATE ASSIGNMENT COMPLETED STATUS
  // ---------------------------------------------------------
  const updateAssignmentStatus = (course, index, status) => {
    const updated = { ...user };
    updated.assignments[course][index].completed = status;

    localStorage.setItem(`user-${updated.email}`, JSON.stringify(updated));
    localStorage.setItem("user", JSON.stringify(updated));

    setUser(updated);
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        registerUser,
        logout,
        addAssignment,             // ADMIN
        updateAssignmentStatus,    // USER
        loadAssignmentsForUser     // USER
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
