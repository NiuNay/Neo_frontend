import React from 'react';
import neologo from "./NeoLogo.png";
import styled from "styled-components";
import { useState } from 'react'


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

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function loginUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:8080', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
        console.log(" complete")
        const data = await response.json()
        console.log("action ")

        if (data.id) {
            localStorage.setItem('token', data.id)
            alert('Login successful')
            window.location.href = '/dashboard'
        } else {
            alert('Please check your username and password')
        }
        console.log("action complete")
    }

    return (
        <div>
            <center>
                <img src={neologo} height={55} width={112} style={{ margin: '30px' }}/>
                <h1 className = "text-center" style={{ color: '#565656', fontFamily: 'ruluko', fontWeight: "bold", fontSize: "40px"}}>Login</h1>
                <form onSubmit={loginUser}>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="username"
                        placeholder="Username"
                    />
                    <br />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                    <br />
                    <input type="submit" value="Login" />
                </form>
                <a href="./patientselection">
                    <LoginButton> Log In </LoginButton>
                </a>
            </center>

        </div>
    )
}

export default Login