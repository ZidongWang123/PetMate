import React, { useState } from "react";
import { Button, Typography, Paper, Grid, Container } from "@mui/material";
import Input from "./Input";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { signup, signin } from "../../actions/auth";
import { darkPurple, orange } from "../../constant/actionTypes";

import "./Auth.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate)).then((errorMessage) => {
        if (errorMessage) {
          setError(errorMessage);
        }
      });
    } else {
      dispatch(signin(formData, navigate)).then((errorMessage) => {
        if (errorMessage) {
          setError(errorMessage);
        }
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          elevation: 3,
          backgroundColor: "white",
          marginTop: 15,
          boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Comic Sans MS",
            fontWeight: 800,
            letterSpacing: ".1rem",
            color: darkPurple,
            margin: 4,
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </Typography>
        {error && <div className="signup-error">{error}</div>}
        <form onSubmit={handleSubmit} className="centered-form">
          <Grid container spacing={2} sx={{ width: "90%" }}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              marginBottom: 3,
              marginTop: 3,
              marginLeft: 2,
              marginRight: 2,
              width: "85%",
              fontFamily: "Comic Sans MS",
              fontWeight: 800,
              letterSpacing: ".1rem",
              color: darkPurple,
              backgroundColor: orange,
            }}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container width="auto !important">
            <Button
              onClick={switchMode}
              sx={{
                fontFamily: "Comic Sans MS",
                fontWeight: 800,
                letterSpacing: ".1rem",
                color: darkPurple,
              }}
            >
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <br />
              {isSignup ? "Then Sign In!" : "Then Sign Up!"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
