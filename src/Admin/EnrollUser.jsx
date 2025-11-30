// EnrollUser.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { useParams } from "react-router-dom";

const EnrollUser = () => {
  const { email } = useParams();

  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find((u) => u.email === email);
    setUser(found);

    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(savedCourses);
  }, [email]);

  const enroll = (course) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updated = users.map((u) =>
      u.email === email
        ? { ...u, courses: [...u.courses, course] }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updated));
    alert("Course assigned!");
  };

  if (!user) return <h3>User not found</h3>;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4">Enroll: {user.name}</Typography>

        <List sx={{ mt: 2 }}>
          {courses.map((c, i) => (
            <ListItem key={i}>
              <Button fullWidth variant="contained" onClick={() => enroll(c)}>
                {c}
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default EnrollUser;
