import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLogin() {
  const [data, setData] = useState({ username: "", password: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: data.username, password: data.password }),
      });

      if (res.ok) {
        const json = await res.json();
        sessionStorage.setItem("token", json.token);
        navigate("/post");
      } else {
        throw new Error();
      }
    } catch {
      setStatus("Wrong username or password.");
      setTimeout(() => setStatus(""), 2000);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "whitesmoke" }}>
      <MyAppBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 5,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 500,
            p: 4,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography variant="h5" textAlign="center" fontWeight={600} color="#9c0507">
            Admin Login
          </Typography>

          <Typography textAlign="center" fontSize={14}>
            Authorized users can log in to add courses and grading schemes.
          </Typography>

          <TextField
            label="Username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            size="small"
            fullWidth
            autoComplete="off"
          />

          <TextField
            label="Password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            size="small"
            fullWidth
            autoComplete="off"
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#9c0507",
              "&:hover": { backgroundColor: "#7a0405" },
              textTransform: "none",
            }}
          >
            Login
          </Button>

          {status && (
            <Typography color="error" textAlign="center">
              {status}
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}