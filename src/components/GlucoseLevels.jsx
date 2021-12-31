import React from 'react';
import neologo from "./NeoLogo.png";
import CanvasJSReact from '../lib/canvasjs.react';
import styled from "styled-components";
import UserService from "../services/UserService";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const id = localStorage.getItem("selectedPatient");

class GlucoseLevels extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            id: id,
            time_data:[],
            current_data: [],
            length: 0,
            title: "Select Patient ID"
        }
    }

    componentDidMount(){
        UserService.getData(this.state.id)
            .then((response) => {
                this.setState({ time_data: response.data[0], current_data: response.data[1]})
                this.setState({len: this.state.time_data.length})
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

        const timeData = this.state.time_data
        const currentData = this.state.current_data
        var dataPlot = [];
        var t = new Date();
        for (let i = 0; i < this.state.len; i++) {
            t = this.state.time_data[i];
            dataPlot.push({x: t, y: this.state.current_data[i]})
        }
        // RIGHT FORMAT BUT CONVERT TO DATE TIME - didn't work yet...

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
                dataPoints: []
                //     [//array
                //     { x: new Date(2012, 1, 1), y: 26},
                //     { x: new Date(2012, 1, 3), y: 38},
                //     { x: new Date(2012, 1, 5), y: 43},
                //     { x: new Date(2012, 1, 7), y: 29},
                //     { x: new Date(2012, 1, 11), y: 41},
                //     { x: new Date(2012, 1, 13), y: 54},
                //     { x: new Date(2012, 1, 20), y: 66},
                //     { x: new Date(2012, 1, 21), y: 60},
                //     { x: new Date(2012, 1, 25), y: 53},
                //     { x: new Date(2012, 1, 27), y: 60}
                // ]
            }, {
                type: "scatter",
                name: "Prick Data",
                showInLegend: true,
                toolTipContent: "{x}: {y}mmol/L",
                dataPoints: dataPlot
                }
            ]
        }

        return (
            <div>
                {timeData}
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