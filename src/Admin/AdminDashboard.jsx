import React, { useContext } from "react";
import { Container, Paper, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "admin") {
    return (
      <Container sx={{ mt: 5 }}>
        <Paper elevation={4} sx={{ p: 4 }}>
          <Typography variant="h6" color="error">
            ❌ Access Denied – Admins Only
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          🛠 Admin Dashboard
        </Typography>

        <Button
          component={Link}
          to="/admin/access"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Assign Courses to Users
        </Button>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
