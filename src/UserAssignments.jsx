import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const UserAssignments = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState({});

  useEffect(() => {
    if (!user) return;

    // Load ALL assignments that admin added
    const stored = JSON.parse(localStorage.getItem("all-assignments")) || {};

    // Load user enrolled courses
    const enrolled =
      JSON.parse(localStorage.getItem(`enrolled-${user.email}`)) || [];

    const filtered = {};

    // only add enrolled course assignments
    enrolled.forEach((course) => {
      if (stored[course]) filtered[course] = stored[course];
    });

    setAssignments(filtered);
  }, [user]);

  if (!user) return <h2>Please login</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Your Assignments</h2>

      {Object.keys(assignments).length === 0 ? (
        <p>No assignments assigned to you yet.</p>
      ) : (
        Object.keys(assignments).map((course) => (
          <div key={course} style={{ marginTop: "20px" }}>
            <h3>{course}</h3>

            {assignments[course].map((a, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              >
                <p><strong>{a.title}</strong></p>
                <p>Due Date: {a.due}</p>

                {/* Show question */}
                <p><strong>Question:</strong> {a.question}</p>

                <textarea
                  placeholder="Write your answer here..."
                  style={{ width: "100%", height: "80px", marginTop: "10px" }}
                ></textarea>

                <button
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    background: "green",
                    color: "white",
                    borderRadius: "5px",
                    border: "none",
                  }}
                >
                  Submit Answer
                </button>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default UserAssignments;
