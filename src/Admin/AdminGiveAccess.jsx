import React, { useContext, useState } from "react";
import {
  Container, Paper, TextField, Typography,
  Button, FormGroup, FormControlLabel, Checkbox
} from "@mui/material";
import { AuthContext } from "../AuthContext";

const courseList = [
  "DBMS", "Java Programming", "Frontend Development",
  "C Programming", "Python", "ReactJS"
];

const AdminGiveAccess = () => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);

  if (!user || user.role !== "admin") {
    return (
      <Container sx={{ mt: 5 }}>
        <Paper elevation={4} sx={{ p: 4 }}>
          <Typography color="error">❌ Access Denied – Admins Only</Typography>
        </Paper>
      </Container>
    );
  }

  const toggleCourse = (course) => {
    setSelectedCourses(prev =>
      prev.includes(course)
        ? prev.filter(c => c !== course)
        : [...prev, course]
    );
  };

  const saveAccess = () => {
    if (!email.trim()) return alert("Enter user email!");

    localStorage.setItem(
      `access-${email}`,
      JSON.stringify({ courses: selectedCourses })
    );

    alert("Access Saved Successfully!");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4">🎓 Assign Courses to Users</Typography>

        <TextField
          label="User Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Typography variant="h6" sx={{ mt: 2 }}>
          Select Courses:
        </Typography>

        <FormGroup>
          {courseList.map(course => (
            <FormControlLabel
              key={course}
              control={
                <Checkbox
                  checked={selectedCourses.includes(course)}
                  onChange={() => toggleCourse(course)}
                />
              }
              label={course}
            />
          ))}
        </FormGroup>

        <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={saveAccess}>
          Save Access
        </Button>
      </Paper>
    </Container>
  );
};

export default AdminGiveAccess;
