import React, { useState } from "react";
import "../pages_css/LoginPage.css";
import loginImage from "../resources/loginImage.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {registerUser}  from "../auth/userApis.js";

const SignUpPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    checked: false,
  });

  const notify = (value) => {
    toast(value);
  };
  const navigate = useNavigate();

  const signUpBtnHandler = async() => {
    if (
      !userDetails.name ||
      !userDetails.email ||
      !userDetails.phone ||
      !userDetails.password ||
      !userDetails.checked
    ) {
      notify("Please Enter All the fields");
      return;
    }
    const response = await registerUser(userDetails);
    if(response){
       toast(response.data.message);
       navigate('/login');
    }
  };
  return (
    <div className="registerContainer">
      <div className="loginForm">
        <div className="inputForm">
          <h2>Create an account</h2>
          <p>Your personal job finder is here</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".8rem",
              width: "85%",
              marginTop: "1rem",
            }}
          >
            <input
              style={{ height: "34px", padding: ".5rem" }}
              type="text"
              placeholder="Name"
              value={userDetails.name}
              onInput={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
            />
            <input
              style={{ height: "34px", padding: ".5rem" }}
              type="email"
              placeholder="Email"
              value={userDetails.email}
              onInput={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
            <input
              style={{ height: "34px", padding: ".5rem" }}
              type="Number"
              placeholder="phone"
              value={userDetails.phone}
              onInput={(e) =>
                setUserDetails({ ...userDetails, phone: e.target.value })
              }
            />
            <input
              style={{ height: "34px", padding: ".5rem" }}
              type="password"
              placeholder="Password"
              value={userDetails.password}
              onInput={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
          </div>
          <div style={{ marginTop: "1rem", fontSize: "14px", color: "grey" }}>
            <span>
              <input
                type="checkbox"
                value={userDetails.checked}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, checked: e.target.checked })
                }
              />
              &nbsp; By creating an account, I agree to our terms of use and
              privacy policy
            </span>
          </div>
          <div style={{cursor:"pointer"}} className="signInBtn" onClick={signUpBtnHandler}>
            Create Account
          </div>
          <p style={{ fontSize: "12px", marginTop: ".3rem" }}>
            Already have an account?
            <Link to={'/Login'}>
              <span
                style={{
                  marginLeft: ".2rem",
                  color: "blue",
                  fontWeight: "600",
                  cursor:"pointer"
                }}
              >
                Sign In
              </span>
            </Link>
          </p>
        </div>
      </div>
      <div className="loginImgContainer">
        <img src={loginImage} className="loginImg" />
        <p className="imgTitle">Your Personal Job Finder</p>
      </div>
    </div>
  );
};

export default SignUpPage;
