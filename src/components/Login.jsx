import React from 'react';
import styled from "styled-components";
import PageHeader from "./PageHeader";

const LoginButton = styled.button`
  background-color: #E9E9E9;
  color: #515050;
  font-size: 20px;
  font-family: ruluko;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  width:20%;
  margin-left:40%;
  margin-right:40%;
`;

function Login() {
    return (
        <div>
            <PageHeader title={"Login"}/>

            <a href="./patientselection">
                <LoginButton> Log In </LoginButton>
            </a>
        </div>
    )
}

export default Login