import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import classes from "./SignInForm.module.css";
import FacebookIcon from "./FacebookIcon";
import AppleIcon from "./AppleIcon";
import GoogleIcon from "./GoogleIcon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import axios from "axios";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [responseError, setResponseError] = useState(false);

  const isEmpty = (text) => text.trim().length === 0;
  const isPasswordCorrect = (password) => {
    if (password.length < 8) {
      setEnteredPassword("");
      setPasswordError("Password is less than 8 characters");
      return true;
    }
    return false;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setResponseError(false);
    if (isEmpty(enteredEmail)) {
      setEnteredEmail("");
      setEmailError("Enter a valid email");
    }
    isPasswordCorrect(enteredPassword);
    if (isEmpty(enteredEmail) || isPasswordCorrect(enteredPassword)) {
      return;
    }
    dispatch(
      userActions.login({
        userAuthInfo: { email: enteredEmail, password: enteredPassword },
      })
    );
    axios
      .post("https://sih-api.herokuapp.com/auth/login", {
        email: enteredEmail.trim(),
        password: enteredPassword,
      })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
    navigate("/");

    // fetch(
    //   "URL", // Enter the server url
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: enteredEmail.trim(),
    //       password: enteredPassword
    //     }),
    //   }
    // );
  };
  return (
    <div className={classes.formContainer}>
      <div className={classes.form}>
        <h5>Sign in</h5>
        <div className={classes.thirdPartyServices}>
          <Button>
            <FacebookIcon />
          </Button>
          <Button>
            <AppleIcon />
          </Button>
          <Button>
            <GoogleIcon />
          </Button>
        </div>
        <form onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            size="small"
            onChange={(event) => {
              setEnteredEmail(event.target.value);
            }}
            value={enteredEmail}
            error={emailError}
            helperText={emailError}
            className={classes.textField}
          />
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            size="small"
            onChange={(event) => {
              setEnteredPassword(event.target.value);
            }}
            value={enteredPassword}
            error={passwordError}
            helperText={passwordError}
          />
          {responseError ? (
            <div className={classes.responseError}>{responseError}</div>
          ) : null}
          <Button
            type="submit"
            className={classes.formButton + " " + classes.signIn}
            variant="contained"
          >
            Sign in
          </Button>
        </form>
        <div className={classes.divider}>
          <hr />
          <div>
            <div>or</div>
          </div>
        </div>
        <Button
          className={classes.formButton + " " + classes.signUp}
          variant="contained"
          onClick={() => {
            navigate("/sign-up");
          }}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default SignInForm;
