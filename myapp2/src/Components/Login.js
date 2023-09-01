import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import register from "./Signin";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "./Login.css";
// import simpleForm from "./SimpleForm";
import "./SimpleForm";
import { useDispatch } from "react-redux";
import { authActions } from "../store/protectRoutes";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    // validateInput(e);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("login", true);
    navigate("/formDetails");
    const { email, password } = values;
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 400 || !res) {
        window.alert("Invalid Credentials");
      } else {
        window.confirm("Login Successfull");
        // window.location.reload();
        dispatch(authActions.login());

        navigate("/formDetails");
      }
    } catch (error) {
      console.log(error);
    }
    setValues({
      email: "",
      password: "",
    });
  };
  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login === true) {
      navigate("/formDetails");
    }
  });
  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100">
      <div className="login">
        <h2 className="mb-3">Login</h2>
        <form className="needs-validation" onSubmit={handleSubmit}>
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
              required
            />
            {/* <div className="invalid-feedback">Please Enter your Email</div> */}
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
              required
            />
            {/* <div className="invalid-feedback">Please Enter your Password</div> */}
          </div>
          {/* <div className="form-group form-check mb-2">
            <input type="checkbox" className="form-check-input" />
            <label htmlFor="check" className="form-check-label">
              Remember me
            </label>
          </div> */}
          <button type="submit" className="btn btn-primary w-100 mt-4">
            Log In
          </button>
          <p className="signup">
            Don't have an account yet?
            <Link to="/register" style={{ textDecoration: "none" }}>
              <span> Sign Up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
