import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import login from "./Login";

function Signin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    empid: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    empid: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };
  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Please enter the Username.";
          }
          break;
        case "empid":
          if (!value) {
            stateObj[name] = "Please enter your Employee ID.";
          }
          break;
        case "email":
          if (!value) {
            stateObj[name] = "Please enter your Email.";
          }
          break;
        case "password":
          if (!value) {
            stateObj[name] = "Please enter the Password.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, empid, email, password } = values;
    console.log(username, empid, email, password);
    try {
      // it gets submitted on port 3000 by deafult but we need it on 8000(port for backend)...so we need proxy
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          empid,
          email,
          password,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("User Already Exists!");
      } else {
        window.alert("Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100">
      <div className="signin">
        <h2 className="heading mb-3">Create an Account!</h2>

        <form className="needs-validation" onSubmit={handleSubmit}>
          <div className="form-group was-validated mb-2">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={values.username}
              className="form-control"
              onChange={handleInput}
              onBlur={validateInput}
              required
            />
            {error.username && (
              <span className="invalid-feedback">{error.username}</span>
            )}
          </div>

          <div className="form-group was-validated mb-2">
            <label htmlFor="empid" className="form-label">
              Employee ID
            </label>
            <input
              type="text"
              name="empid"
              value={values.empid}
              className="form-control"
              onChange={handleInput}
              onBlur={validateInput}
              required
            />
            {error.empid && (
              <span className="invalid-feedback">{error.empid}</span>
            )}
          </div>

          <div className="form-group was-validated mb-2">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              className="form-control"
              onChange={handleInput}
              onBlur={validateInput}
              required
            />
            {error.email && (
              <span className="invalid-feedback">{error.email}</span>
            )}
          </div>

          <div className="form-group was-validated mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              className="form-control"
              onChange={handleInput}
              onBlur={validateInput}
              required
            />
            {error.password && (
              <span className="invalid-feedback">{error.password}</span>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100 mt-4">
            Sign Up
          </button>

          {/* <Link to="/login" style={{ textDecoration: "none" }}>
            <button type="submit" className="btn btn-primary w-100 mt-2">
              Log in
            </button>
          </Link> */}

          <p className="signup">
            Already have an Account?
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span> Sign In</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
