import React from 'react';
import styles from "./styles.css"
import CanvasJSReact from '../lib/canvasjs.react';
import styled from "styled-components";
import UserService from "../services/UserService";
import PatientTable from "./PatientTable";
import PageHeader from "./PageHeader";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const id = localStorage.getItem("selectedPatient");

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
            start_date: [],
            end_date: [],
            start_input: [],
            end_input: [],
            title: "Select Patient ID"
        }
        this.changeEndHandler = this.changeEndHandler.bind(this);
        this.changeStartHandler = this.changeStartHandler.bind(this);
    }

    componentDidMount(){
        UserService.getData(this.state.id)
            .then((response) => {
                this.setState({ sweat_time_data: response.data[0], sweat_glucose_data: response.data[1], prick_time_data: response.data[2], prick_glucose_data: response.data[3]})
                this.setState({sweat_data_length: this.state.sweat_time_data.length, prick_data_length: this.state.prick_time_data.length})
                const last_date = new Date(this.state.sweat_time_data[this.state.sweat_data_length-1]);
                const start_string = (last_date.getMonth()+1) + "-" + (last_date.getDate()) + "-" +  last_date.getFullYear();
                const start = new Date(start_string);
                const end = new Date(start_string);
                end.setDate(end.getDate()+1);
                const plotted_day = start.getDate()+ "/" + (start.getMonth()+1) +"/" + start.getFullYear();
                this.setState({start_date: start, end_date: end, end_input: plotted_day, start_input: plotted_day})
            })
            .catch(() => {                          // checks data was retrieved
                alert("Error retrieving patient data");
            });
    }

    saveTimeFrame = (e) => {
        e.preventDefault();
        var end_string = this.state.end_input;
        const end_array = end_string.split('/');
        [end_array[0], end_array[1]] = [end_array[1], end_array[0]];
        end_string = end_array.join("-")
        const end = new Date(end_string);
        end.setDate(end.getDate()+1);

        var start_string = this.state.start_input;
        const start_array = start_string.split('/');
        [start_array[0], start_array[1]] = [start_array[1], start_array[0]];
        start_string = start_array.join("-")
        const start = new Date(start_string);

        this.setState({end_date: end, start_date: start});
    }

    changeEndHandler = (event) => {
        this.setState({end_input: event.target.value});
    }
    changeStartHandler = (event) => {
        this.setState({start_input: event.target.value});
    }

    render (){
        var sweat_data = [];
        for (let i = 0; i < this.state.sweat_data_length; i++) {
            var t = new Date(this.state.sweat_time_data[i]);
            if(t>this.state.start_date && t<this.state.end_date) {
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
                valueFormatString: 'D MMM h:mm TT',
                labelAngle: -50
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
                <PageHeader title={"Glucose Levels"}/>

                <PatientTable/>

                <div className='pagewrapper'>
                    <div className='row'>
                        <div className='column'>
                            <br></br>
                            <h3 style={title}>Comments</h3>
                            <br></br>
                            <h3 style={title}>Time Frame</h3>
                            <text style={text1}>From: </text>
                            <input name="time_instant" className="form-control" value={this.state.start_input} onChange={this.changeStartHandler}/>
                            <text style={text1}>To: </text>
                            <input name="time_instant" className="form-control" value={this.state.end_input} onChange={this.changeEndHandler}/>
                            <SaveButton onClick={this.saveTimeFrame}>Load graph</SaveButton>
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

const SaveButton = styled.button`
    background-color: #E9E9E9;
    color: #515050;
    font-size: 18.72px;
    font-family: ruluko;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
    width:30%;
    margin-left:35%;
    margin-right:35%;
    `;

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

const text1 = {
    fontSize: 20,
    fontFamily: 'ruluko',
    color: '#565656',
}

const title = {
    color: '#565656',
    fontFamily: 'ruluko',
    fontWeight: "bold"
}