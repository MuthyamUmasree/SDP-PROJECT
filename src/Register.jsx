import React, { useState, useContext } from "react";
import { Container, Paper, Typography, TextField, Button, Box } from "@mui/material";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password
    };

    registerUser(newUser);

    alert("Registered Successfully!");
    navigate("/login");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
