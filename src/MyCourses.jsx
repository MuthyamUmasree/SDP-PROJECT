import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { assignmentsData } from "./assignmentsData";

const MyCourses = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <h2>Please login</h2>;

  // Get enrolled courses
  const enrolled =
    JSON.parse(localStorage.getItem(`enrolled-${user.email}`)) || [];

  // Get completed assignments
  const completedData =
    JSON.parse(localStorage.getItem(`completed-${user.email}`)) || {};

  // Mark assignment as completed
  const markCompleted = (course, assignmentId) => {
    const updated = { ...completedData };

    if (!updated[course]) updated[course] = [];
    if (!updated[course].includes(assignmentId)) {
      updated[course].push(assignmentId);
    }

    localStorage.setItem(`completed-${user.email}`, JSON.stringify(updated));
    window.location.reload();
  };

  // --------- Circular Progress Style ----------
  const circleStyle = (progress) => ({
    background: `conic-gradient(#4caf50 ${progress * 3.6}deg, #ddd 0deg)`,
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Courses</h1>

      {enrolled.length === 0 ? (
        <p>You have not enrolled in any courses.</p>
      ) : (
        enrolled.map((course) => {
          const assignments = assignmentsData[course] || [];
          const completed = completedData[course] || [];

          const progress =
            assignments.length === 0
              ? 0
              : Math.round((completed.length / assignments.length) * 100);

          return (
            <div
              key={course}
              style={{
                marginBottom: "30px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
            >
              <h2>{course}</h2>

              {/* -------- Circular Progress -------- */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ...circleStyle(progress),
                  }}
                >
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      background: "#fff",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {progress}%
                  </div>
                </div>

                <p style={{ fontSize: "16px" }}>
                  {completed.length}/{assignments.length} completed
                </p>
              </div>

              {/* -------- Assignments List -------- */}
              <h3>Assignments</h3>
              {assignments.map((a) => (
                <div
                  key={a.id}
                  style={{
                    padding: "10px",
                    marginBottom: "10px",
                    background: "#f8f8f8",
                    borderRadius: "8px",
                  }}
                >
                  <p>
                    <strong>{a.title}</strong> <br />
                    Due: {a.dueDate}
                  </p>

                  {completed.includes(a.id) ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      ✔ Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => markCompleted(course, a.id)}
                      style={{
                        padding: "5px 12px",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Submit Assignment
                    </button>
                  )}
                </div>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyCourses;
