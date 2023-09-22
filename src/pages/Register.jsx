import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/8716838.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const passwordregex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
  const userNameregex = /^[0-9a-zA-Z]+$/;

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, email, username } = values;
    if (!passwordregex.test(password)) {
      toast.error(
        "Password must be 8 to 20 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.",
        toastOptions
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Both Passwords Should be same..", toastOptions);
      return false;
    } else if (!userNameregex.test(username) || username.length < 3) {
      toast.error(
        "Username should be more than 3 characters and must contain only letters and numbers",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("EMail Required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>CHAT WITH ME</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(
    158deg,
    rgb(65, 80, 95) 0%,
    rgb(36, 37, 38) 50.54%
  );
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justif-content: center;

    img {
      height: 5rem;
    }
    h1 {
      color: linear-gradient(
        158deg,
        rgb(65, 80, 95) 0%,
        rgb(36, 37, 38) 50.54%
      );
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #ffffff;
    border-radius: 2rem;
    padding: 1rem 4rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #656563;
      border-radius: 0.4rem;
      color: #656563;
      width: 100%;
      font-size: 1.2rem;

      &:focus {
        border: 0.15rem solid #000000;
        outline: none;
      }
    }
    button {
      background-color: transparent;
      padding: 1rem 2rem;
      border: none;
      outline: solid 1px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #000000;
        color: white;
      }
    }
    span {
      text-transform: capitalize;
      a {
        color: #680747;
        text-transform: none;
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
      }
    }
  }
`;
