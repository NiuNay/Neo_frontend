import React from 'react';
import neologo from "./NeoLogo.png";
import styled from 'styled-components'
import TimeInput from 'react-input-time';

function PrickReading() {

    var today = new Date(),
    date = new String(),
    time = today.getHours() + ':' + today.getMinutes()
    date = today.getDate() + '/' + (today.getMonth()+1) + '/' +  today.getFullYear()

    return (
        <div>
            <center>
                <img src={neologo} height={55} width={112} style={{ margin: '30px' }}/>
            </center>
            <h1 className = "text-center" style={{ color: '#565656', fontFamily: 'ruluko', fontWeight: "bold", fontSize: "40px"}}>Comment</h1>
        <div className= "button-grid-2">
            <a href="./menu">
                <BackButton> Back </BackButton>
            </a>
            <a href="./menu">
                <BackButton> Save </BackButton>
            </a>

        </div>
       
        <div className="grid-columns">
            <text style={text1}> Input prick readings </text>
            <input type="text"></input> 
            <text style={text1}> Input date </text>
            <input
                className="input-time"
                defaultValue={date}
                onChange={(event) => {}}>            
            </input>
            <text style={text1}> Input time </text>  
            <TimeInput className="input-time" initialTime= {time} onChange={(event) => {}} />
        </div>
     
         </div>


    )
}

export default PrickReading

  
const form1 = {
    position: 'absolute',
    top: "40%",
    left: "40%",
    fontSize: 20,
    ontFamily: 'ruluko', 
    color: '#565656',
    
    }
    
    const form2 = {
    position: 'absolute',
    top: "50%",
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

    const text1 = {
        fontSize: 20,
        ontFamily: 'ruluko', 
        color: '#565656',
    }