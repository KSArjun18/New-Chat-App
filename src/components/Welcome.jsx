import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/o2-bubl.gif";
import Logout from "./Logout";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const setData = async () => {
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).username
      );
    };
    setData();
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
      <div className="logout">
        <span>Logout</span>
        <Logout />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #656565;
  flex-direction: column;
  img {
    height: 18rem;
  }
  span {
    color: #9f1e49;
  }
  .logout {
    display: flex;
    align-items: center;
    background-color: #9f1e49;
    border-radius: 0.5rem;
    margin: 5rem;
    span {
      color: white;
      margin-left: 1rem;
    }
  }
`;
