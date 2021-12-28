import React from 'react';
import neologo from "./NeoLogo.png";
import styles from "./styles.css"
import CanvasJSReact from '../lib/canvasjs.react';
import styled from "styled-components";
import UserService from "../services/UserService";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BackButton = styled.button`
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

const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title:{
        text: "Glucose Levels over Time"
    },
    axisY: {
        title: "Blood Glucose (mmol/L)",
    },
    axisX: {
        title: "Time of Day",
        interval: 2
    },
    toolTip: {
        shared: true
    },
    data: [{
        type: "line",
        name: "Sweat Data",
        showInLegend: true,
        toolTipContent: "{x}: {y}mmol/L",
        dataPoints: [
            { x: 1, y: 64 },
            { x: 2, y: 61 },
            { x: 3, y: 64 },
            { x: 4, y: 62 },
            { x: 5, y: 64 },
            { x: 6, y: 60 },
            { x: 7, y: 58 },
            { x: 8, y: 59 },
            { x: 9, y: 53 },
            { x: 10, y: 54 },
            { x: 11, y: 61 },
            { x: 12, y: 60 },
            { x: 13, y: 55 },
            { x: 14, y: 60 },
            { x: 15, y: 56 },
            { x: 16, y: 60 },
            { x: 17, y: 59.5 },
            { x: 18, y: 63 },
            { x: 19, y: 58 },
            { x: 20, y: 54 },
            { x: 21, y: 59 },
            { x: 22, y: 64 },
            { x: 23, y: 59 }
        ]
    },
        {
            type: "scatter",
            name: "Prick Data",
            showInLegend: true,
            toolTipContent: "{x}: {y}mmol/L",
            dataPoints: [
                { x: 1, y: 65 },
                { x: 4, y: 60 },
                { x: 9, y: 62 },
                { x: 10, y: 54 },
                { x: 13, y: 60 },
                { x: 14, y: 64 },
                { x: 16, y: 59 },
                { x: 18, y: 63 },
                { x: 23, y: 65 }
            ]
        }
    ]
}

class GlucoseLevels extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            patient_data:[]
        }
    }

    componentDidMount(){
        UserService.getData()
            .then((response) => {
                this.setState({ patient_data: response.data})
            })
            .catch(() => {                          // checks data was retrieved
                alert("Error retrieving patient data");
            });
    }

    render (){
        return (
            <div>
                <center>
                    <img src={neologo} height={55} width={112} style={{ margin: '30px' }}/>
                </center>
                <h1 className = "text-center" style={{ color: '#565656', fontFamily: 'ruluko', fontWeight: "bold", fontSize: "40px"}}>Glucose Levels</h1>
                <div className='pagewrapper'>
                    <div className='row'>
                        <div className='column'>
                            <h3 style={{ color: '#565656', fontFamily: 'ruluko', fontWeight: "bold"}}>Selected Patient</h3>
                            {/*I think melissa is writing code for this?*/}
                            <h3 style={{ color: '#565656', fontFamily: 'ruluko', fontWeight: "bold"}}>Comments</h3>
                        </div>
                        <div className='column'>
                            <CanvasJSChart options = {options}/>
                        </div>
                    </div>
                </div>
                <a href="./menu">
                    <BackButton> Back </BackButton>
                </a>
            </div>
        )
    }
}

export default GlucoseLevels