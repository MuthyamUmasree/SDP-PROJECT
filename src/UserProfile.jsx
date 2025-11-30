import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <h2>Please login</h2>;

  // Read enrolled courses stored by user
  const enrolled = JSON.parse(localStorage.getItem(`enrolled-${user.email}`)) || [];

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Profile</h1>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <h2>Enrolled Courses</h2>

      {enrolled.length === 0 ? (
        <p>No enrolled courses.</p>
      ) : (
        enrolled.map((course) => <p key={course}>{course}</p>)
      )}
    </div>
  );
};

export default UserProfile;

