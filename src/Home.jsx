import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";

const featuredCourses = [
  { id: 1, title: "DBMS", description: "Learn ER models, normalization, SQL queries." },
  { id: 2, title: "Frontend Development", description: "HTML, CSS, JS, React basics." },
  { id: 3, title: "Java Programming", description: "OOP, collections, JavaFX basics." },
  { id: 4, title: "Operating Systems", description: "Learn process scheduling, memory management, and file systems."},
];

const Home = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to LMS Portal 
      </Typography>
      <Typography variant="h6" align="center" gutterBottom color="text.secondary">
        Learn new skills and enhance your knowledge
      </Typography>

      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Featured Courses
      </Typography>
      <Grid container spacing={3}>
        {featuredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card elevation={4} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
              </CardContent>
              <Button
                component={Link}
                to={`/courses/${course.id}`}
                fullWidth
                variant="contained"
                sx={{ mt: "auto" }}
              >
                View Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
