// ManageUsers.jsx
import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, List, ListItem, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          👥 Manage Users
        </Typography>

        <List>
          {users.map((u, index) => (
            <ListItem
              key={index}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>
                <b>{u.name}</b> — {u.email}
              </span>

              <Button
                variant="contained"
                component={Link}
                to={`/admin/enroll/${u.email}`}
              >
                Enroll User
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ManageUsers;
