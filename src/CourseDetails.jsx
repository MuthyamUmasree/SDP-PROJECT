import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Paper, Button, Checkbox, Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "./AuthContext";

const coursesData = [
  {
    id: 1,
    title: "DBMS",
    description: "Learn ER models, normalization, SQL queries, and indexing methods.",
    syllabus: ["Introduction to DBMS", "ER Diagrams", "Normalization", "SQL Queries"],
    assignments: [
      { id: 1, title: "ER Diagram Assignment", due: "2025-12-10" },
      { id: 2, title: "SQL Queries Task", due: "2025-12-15" }
    ]
  },
  {
    id: 2,
    title: "Frontend Development",
    description: "Learn HTML, CSS, JavaScript, and React.",
    syllabus: ["HTML", "CSS", "JS", "React"],
    assignments: [
      { id: 1, title: "Build Portfolio", due: "2025-12-12" },
      { id: 2, title: "React Todo App", due: "2025-12-18" }
    ]
  }
];

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const course = coursesData.find((c) => c.id === parseInt(id));

  const [progress, setProgress] = useState([]);

  // Load saved assignment progress per user
  useEffect(() => {
    if (!user || !course) return;

    const saved =
      JSON.parse(localStorage.getItem(`progress-${user.email}-${course.title}`)) || [];
    setProgress(saved);
  }, [course, user]);

  // Mark assignment completed
  const toggleComplete = (assignmentId) => {
    let updated;

    if (progress.includes(assignmentId)) {
      updated = progress.filter((id) => id !== assignmentId);
    } else {
      updated = [...progress, assignmentId];
    }

    setProgress(updated);
    localStorage.setItem(
      `progress-${user.email}-${course.title}`,
      JSON.stringify(updated)
    );
  };

  if (!course) return <h2>Course not found</h2>;

  const totalAssignments = course.assignments.length;
  const completedAssignments = progress.length;
  const percentage = Math.round((completedAssignments / totalAssignments) * 100);

  return (
    <Container sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        {/* Title + Progress */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">{course.title}</Typography>

          {/* Circular Progress */}
          <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" value={percentage} size={80} />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6">{percentage}%</Typography>
            </Box>
          </Box>
        </Box>

        <Typography sx={{ mt: 2 }}>{course.description}</Typography>

        {/* Syllabus */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Syllabus:
        </Typography>
        <ul>
          {course.syllabus.map((s, index) => (
            <li key={index}>{s}</li>
          ))}
        </ul>

        {/* Assignments */}
        <Typography variant="h5" sx={{ mt: 3 }}>
          📘 Assignments
        </Typography>

        {course.assignments.map((a) => (
          <Paper
            key={a.id}
            sx={{
              p: 2,
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <Typography>
                <strong>{a.title}</strong>
              </Typography>
              <Typography>Due: {a.due}</Typography>
            </div>

            <div>
              <Checkbox
                checked={progress.includes(a.id)}
                onChange={() => toggleComplete(a.id)}
              />
              <Button variant="contained" size="small">
                Submit
              </Button>
            </div>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
};

export default CourseDetails;
