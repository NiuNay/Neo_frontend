import React from 'react';
import styled from "styled-components";
import PageHeader from "./PageHeader";
import "./App.css"

function Login() {
    return (
        <div>
            <PageHeader title={"Login"}/>

            <a href="./patientselection">
                <button className={"pageButton"}> Log In </button>
            </a>
        </div>
    )
}

export default Login