import React, { useState } from "react";

const AdminAddAssignment = () => {
  const [course, setCourse] = useState("");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [question, setQuestion] = useState("");

  const handleAdd = () => {
    if (!course || !title || !dueDate || !question) {
      alert("Please fill all fields");
      return;
    }

    // read old assignments
    const stored = JSON.parse(localStorage.getItem("all-assignments")) || {};

    // course not available? create it
    if (!stored[course]) stored[course] = [];

    // push assignment
    stored[course].push({
      title,
      due: dueDate,
      question,
      completed: false,
    });

    // save back
    localStorage.setItem("all-assignments", JSON.stringify(stored));

    alert("Assignment Added Successfully!");

    setCourse("");
    setTitle("");
    setDueDate("");
    setQuestion("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Assignment</h2>

      <input
        type="text"
        placeholder="Course Name (Example: DBMS)"
        value={course}
        onChange={(e) => setCourse(e.target.value.trim())}
      /><br/><br/>

      <input
        type="text"
        placeholder="Assignment Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br/><br/>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      /><br/><br/>

      <textarea
        placeholder="Enter assignment question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "300px", height: "80px" }}
      /><br/><br/>

      <button onClick={handleAdd}>Add Assignment</button>
    </div>
  );
};

export default AdminAddAssignment;
