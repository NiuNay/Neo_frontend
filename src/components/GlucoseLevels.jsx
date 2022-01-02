import React from 'react';
import neologo from "./NeoLogo.png";
import styles from "./styles.css"
import CanvasJSReact from '../lib/canvasjs.react';
import styled from "styled-components";
import UserService from "../services/UserService";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const id = localStorage.getItem("selectedPatient");
// Default start and end dates for plotting data

class GlucoseLevels extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            id: id,
            sweat_time_data:[],
            sweat_glucose_data: [],
            prick_time_data: [],
            prick_glucose_data: [],
            sweat_data_length: 0,
            prick_data_length: 0,
            start_time: [],
            end_time: [],
            title: "Select Patient ID"
        }
    }

    componentDidMount(){
        UserService.getData(this.state.id)
            .then((response) => {
                this.setState({ sweat_time_data: response.data[0], sweat_glucose_data: response.data[1], prick_time_data: response.data[2], prick_glucose_data: response.data[3]})
                this.setState({sweat_data_length: this.state.sweat_time_data.length, prick_data_length: this.state.prick_time_data.length})
                const end = new Date(this.state.sweat_time_data[this.state.sweat_data_length-1]);
                const start = new Date(end)
                start.setDate(start.getDate()-1)
                this.setState({start_time: start, end_time: end})
            })
            .catch(() => {                          // checks data was retrieved
                alert("Error retrieving patient data");
            });
    }

    render (){
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

        var sweat_data = [];
        for (let i = 0; i < this.state.sweat_data_length; i++) {
            var t = new Date(this.state.sweat_time_data[i]);
            if(t>this.state.start_time && t<this.state.end_time) {
            sweat_data.push({x: t, y: this.state.sweat_glucose_data[i]})
            }
        }

        var prick_data = [];
        for (let i = 0; i < this.state.prick_data_length; i++) {
            var t = new Date(this.state.prick_time_data[i]);
            prick_data.push({x: t, y: this.state.prick_glucose_data[i]})
        }

        const options = {
            zoomEnabled: true,
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
                dataPoints: sweat_data
            }, {
                type: "scatter",
                name: "Prick Data",
                showInLegend: true,
                toolTipContent: "{x}: {y}mmol/L",
                dataPoints: prick_data
                }
            ]
        }

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
                            <h3 style={{ color: '#565656', fontFamily: 'ruluko', fontWeight: "bold"}}>Time Frame</h3>
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