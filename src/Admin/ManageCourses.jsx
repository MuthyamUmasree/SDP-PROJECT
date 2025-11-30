// ManageCourses.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageCourses = () => {
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);

  // Load courses from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(saved);
  }, []);

  const addCourse = () => {
    if (!course.trim()) return;

    const newList = [...courses, course];
    setCourses(newList);
    localStorage.setItem("courses", JSON.stringify(newList));
    setCourse("");
  };

  const deleteCourse = (name) => {
    const newList = courses.filter((c) => c !== name);
    setCourses(newList);
    localStorage.setItem("courses", JSON.stringify(newList));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4">📚 Manage Courses</Typography>

        <TextField
          fullWidth
          label="New Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          sx={{ mt: 2 }}
        />

        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={addCourse}>
          Add Course
        </Button>

        <List sx={{ mt: 3 }}>
          {courses.map((c, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton onClick={() => deleteCourse(c)} color="error">
                  <DeleteIcon />
                </IconButton>
              }
            >
              • {c}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ManageCourses;
