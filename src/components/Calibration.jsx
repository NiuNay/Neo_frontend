import React from 'react';
import neologo from "./NeoLogo.png";
import styled from 'styled-components'


function Calibration() {
    return (
        <div>
            <center>
                <img src={neologo} height={55} width={112} style={{ margin: '30px' }}/>
            </center>
            <h1 className = "text-center" style={{ color: '#565656', fontFamily: 'ruluko', fontWeight: "bold", fontSize: "40px"}}>Calibration and Settings</h1>
            <h2 style={text1}>Linear Function Callibration</h2>
            
            <form style={form1}> 
                <label>Input slope: 
                    <input type="text" />
                </label>
            </form>
            <form style={form2}> 
                <label>Input offset:
                    <input type="text" />
                </label>
            </form>
            <h2 style={text2}>Sweat reading settings</h2>
            <form style={form3}> 
                <label>Time delay:
                    <input type="text"  />
                </label>
            </form>
            <div className= "button-grid-2">
                <a href="./menu">
                    <BackButton> Back </BackButton>
                </a>
                <a href="./menu">
                    <BackButton> Save </BackButton>
                </a>
            </div>
        </div>
    )
}

export default Calibration

const text1 = {
    position: 'relative',
    top: "25px",
    left: "100px",
    fontSize: 25,
    ontFamily: 'ruluko', 
    fontWeight: "bold",
    color: '#565656'
}

const text2 = {
    position: 'relative',
    top: "150px",
    left: "100px",
    fontSize: 25,
    ontFamily: 'ruluko', 
    fontWeight: "bold",
    color: '#565656'
}

const form1 = {
    position: 'absolute',
    top: "30%",
    left: "40%",
    fontSize: 20,
    ontFamily: 'ruluko', 
    color: '#565656',
  
}

const form2 = {
    position: 'absolute',
    top: "40%",
    left: "40%",
    fontSize: 20,
    ontFamily: 'ruluko', 
    color: '#565656',
}

const form3 = {
    position: 'absolute',
    top: "60%",
    left: "40%",
    fontSize: 20,
    ontFamily: 'ruluko', 
    color: '#565656',
}

const BackButton = styled.button`
  background-color: #E9E9E9;
  color: #515050;
  font-size: 20px;
  font-family: ruluko;
  border-radius: 5px;
  cursor: pointer;
  width: 100%
`;
