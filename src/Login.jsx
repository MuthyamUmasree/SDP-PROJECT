import React, { useState, useContext } from "react";
import { Container, Paper, Typography, TextField, Button, Box } from "@mui/material";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("⚠️ Please enter your email.");
      return;
    }

    if (!password.trim()) {
      alert("⚠️ Please enter your password.");
      return;
    }

    login(email, password);
    alert(`Logged in as ${email}`);
    navigate("/courses");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <Typography variant="h5" gutterBottom align="center">
          🔐 Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Login;
