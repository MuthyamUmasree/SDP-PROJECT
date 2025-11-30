import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const allCourses = ["DBMS", "Frontend", "Java", "Python", "ML"];

const Courses = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <h2>Please login</h2>;

  // ADMIN sees all courses
  if (user.role === "admin") {
    return (
      <div style={{ padding: "20px" }}>
        <h1>All Courses (Admin View)</h1>
        {allCourses.map(c => <p key={c}>{c}</p>)}
      </div>
    );
  }

  const access = JSON.parse(localStorage.getItem(`access-${user.email}`));
  const allowedCourses = access?.courses || [];

  const enrolled = JSON.parse(localStorage.getItem(`enrolled-${user.email}`)) || [];

  const enroll = (course) => {
    const updated = [...enrolled, course];
    localStorage.setItem(`enrolled-${user.email}`, JSON.stringify(updated));
    alert(`${course} enrolled successfully!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Available Courses</h1>

      {allowedCourses.length === 0 ? (
        <p>No access. Contact Admin.</p>
      ) : (
        allowedCourses.map(course => (
          <div key={course} style={{ marginBottom: "10px" }}>
            <b>{course}</b>

            {enrolled.includes(course) ? (
              <span style={{ color: "green", marginLeft: "10px" }}>✔ Enrolled</span>
            ) : (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => enroll(course)}
              >
                Enroll
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Courses;
