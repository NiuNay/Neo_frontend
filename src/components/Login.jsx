import React from 'react';
import neologo from "./NeoLogo.png";
import styled from "styled-components";
import { useState, Component } from 'react'
import AuthService from "../services/AuthService";
import axios from "axios";

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


// reference:
// https://github.com/bezkoder/react-jwt-auth/blob/master/src/components/login.component.js

// const required = value => {
//     if (!value) {
//         return (
//             <div className="alert alert-danger" role="alert">
//                 This field is required!
//             </div>
//         );
//     }
// };
//
// export default class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.handleLogin = this.handleLogin.bind(this);
//         this.onChangeUsername = this.onChangeUsername.bind(this);
//         this.onChangePassword = this.onChangePassword.bind(this);
//
//         this.state = {
//             username: "",
//             password: "",
//             loading: false,
//             message: ""
//         };
//     }
//
//     onChangeUsername(e) {
//         this.setState({
//             username: e.target.value
//         });
//     }
//
//     onChangePassword(e) {
//         this.setState({
//             password: e.target.value
//         });
//     }
//
//     handleLogin(e) {
//         e.preventDefault();
//
//         this.setState({
//             message: "",
//             loading: true
//         });
//         alert("log in being handled");
//         // this.form.validateAll();
//
//         // if (this.checkBtn.context._errors.length === 0) {
//             AuthService.login(this.state.username, this.state.password).then(
//                 () => {
//                     alert("successful login!")
//                     // this.props.history.push("/profile");
//                     // window.location.reload();
//                 },
//                 error => {
//                     const resMessage =
//                         (error.response &&
//                             error.response.data &&
//                             error.response.data.message) ||
//                         error.message ||
//                         error.toString();
//
//                     this.setState({
//                         loading: false,
//                         message: resMessage
//                     });
//                 }
//             );
//         // } else {
//         //     this.setState({
//         //         loading: false
//         //     });
//         // }
//     }
//
//     render() {
//         return (
//             <div className="col-md-12">
//                 <div className="card card-container">
//
//                     <form
//                         onSubmit={this.handleLogin}
//                         ref={c => {
//                             this.form = c;
//                         }}
//                     >
//                         <div className="form-group">
//                             <label htmlFor="username">Username</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="username"
//                                 value={this.state.username}
//                                 onChange={this.onChangeUsername}
//                                 validations={[required]}
//                             />
//                         </div>
//
//                         <div className="form-group">
//                             <label htmlFor="password">Password</label>
//                             <input
//                                 type="password"
//                                 className="form-control"
//                                 name="password"
//                                 value={this.state.password}
//                                 onChange={this.onChangePassword}
//                                 validations={[required]}
//                             />
//                         </div>
//
//                         <div className="form-group">
//                             <button
//                                 className="btn btn-primary btn-block"
//                                 disabled={this.state.loading}
//                             >
//                                 {this.state.loading && (
//                                     <span className="spinner-border spinner-border-sm"></span>
//                                 )}
//                                 <span>Login</span>
//                             </button>
//                         </div>
//
//                         {this.state.message && (
//                             <div className="form-group">
//                                 <div className="alert alert-danger" role="alert">
//                                     {this.state.message}
//                                 </div>
//                             </div>
//                         )}
//                         <button
//                             style={{ display: "none" }}
//                             ref={c => {
//                                 this.checkBtn = c;
//                             }}
//                         />
//                     </form>
//                 </div>
//             </div>
//         );
//     }
// }










function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function loginUser(event) {
        event.preventDefault()
        const userData = {
            username: username,
            password: password
        };
        axios.post("http://localhost:8080/api/login", userData).then((response)=>{

            console.log(response.status);
            console.log(response.data);
        })

        // const response = await fetch('http://localhost:8080', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         username,
        //         password,
        //     }),
        // })
        console.log(" complete")
        // const data = await response.json()
        console.log("action ")

        // if (data.id) {
        //     localStorage.setItem('token', data.id)
        //     alert('Login successful')
        //     window.location.href = '/dashboard'
        // } else {
        //     alert('Please check your username and password')
        // }
        // console.log("action complete")
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