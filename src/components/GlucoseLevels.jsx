import React from 'react';
import  "./styles.css";
import CanvasJSReact from '../lib/canvasjs.react';
import UserService from "../services/UserService";
import PatientTable from "./PatientTable";
import PageHeader from "./PageHeader";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import "./GlucoseLevels.css"


var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const id = localStorage.getItem("selectedPatient");
const today = new Date();
var current_time = today.getHours() + ":" + today.getMinutes();

/**This class handles the graphing of the patient's glucose levels over time and associated functionalities (choosing
 * a custom time frame of data to view, viewing and inputting notes).*/
class GlucoseLevels extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            id: id,
            comment_date: new Date(),
            comment_time: current_time,
            new_note:'',
            sweat_time_data:[],
            sweat_glucose_data: [],
            prick_time_data: [],
            prick_glucose_data: [],
            note_time_data: [],
            note: [],
            note_data_length:0,
            sweat_data_length: 0,
            prick_data_length: 0,
            start_input:  '',
            end_input:  '',
            start_date: [],
            end_date: [],
            title: "Select Patient ID"
        }
        this.changeEndHandler = this.changeEndHandler.bind(this);
        this.changeStartHandler = this.changeStartHandler.bind(this);
        this.changeCommentHandler = this.changeCommentHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeTimeHandler = this.changeTimeHandler.bind(this);
        this.saveNote = this.saveNote.bind(this)
    }

    fetchNewNotes(){
        UserService.getData(this.state.id)
            .then((response) => {
                this.setState({ note_time_data: response.data[4], note: response.data[5]})
                this.setState({ note_data_length: this.state.note_time_data.length})
            })

    }

    /**Retrieves sweat and prick data from the database and sets the default time frame (start and end dates) to plot.
     * The default time frame is the most recent day with any recorded sweat data.*/
    componentDidMount(){
        UserService.getData(this.state.id)
            .then((response) => {
                this.setState({ sweat_time_data: response.data[0], sweat_glucose_data: response.data[1], prick_time_data: response.data[2], prick_glucose_data: response.data[3], note_time_data: response.data[4], note: response.data[5]})
                this.setState({sweat_data_length: this.state.sweat_time_data.length, prick_data_length: this.state.prick_time_data.length, note_data_length: this.state.note_time_data.length})
                const last_date = new Date(this.state.sweat_time_data[this.state.sweat_data_length-1]);
                const start_string = (last_date.getMonth()+1) + "-" + (last_date.getDate()) + "-" +  last_date.getFullYear();
                const start = new Date(start_string);
                const end = new Date(start_string);
                end.setDate(end.getDate()+1);
                this.setState({start_date: start, end_date: end, end_input: start, start_input: start})
            })
            .catch(() => {                          // checks data was retrieved
                alert("Error retrieving patient data");
            });
    }

    /**Saves the inputted values in the desired format.*/
    saveTimeFrame = (e) => {
        e.preventDefault();
        const end = new Date(this.state.end_input);
        end.setDate(end.getDate()+1);
        this.setState({end_date: end, start_date: this.state.start_input});
    }

    saveNote = (e) => {
        e.preventDefault();
        var date = this.state.comment_date.getDate();

        if (date < 10) {
            date = "0"+date;
        }

        var month = this.state.comment_date.getMonth()+1;
        if (month < 10) {
            month = "0"+month;
        }
        let patient = {note: this.state.new_note, time_instant: month + "/" + date + '/' + this.state.comment_date.getFullYear() + ' ' + this.state.comment_time + ":00"};
        if (this.state.new_note && this.state.comment_time && this.state.comment_date) {
            console.log('patient => ' + JSON.stringify(patient));
            UserService.addNote(patient,this.state.id);
            this.fetchNewNotes();
            alert("Data saved!")
        }
    }

    /**Handles the change from the default value to the user specified value.*/
    changeEndHandler = (date) => {
        this.setState({end_input: date});
    }

    changeStartHandler = (date) => {
        this.setState({start_input: date});
    }

    changeCommentHandler= (event) => {
        this.setState({new_note: event.target.value});
    }

    changeDateHandler(date) {
        this.setState({comment_date: date});
    }

    changeTimeHandler= (time) => {
        this.setState({comment_time: time});
    }

    render (){
        var sweat_data = [];
        // Loops through the entire list of sweat data
        for (let i = 0; i < this.state.sweat_data_length; i++) {
            var t_sweat = new Date(this.state.sweat_time_data[i]);
            // Only retrieves data between the default (or specified) start and end dates
            if(t_sweat>this.state.start_date && t_sweat<this.state.end_date) {
                sweat_data.push({x: t_sweat, y: this.state.sweat_glucose_data[i]})
            }
        }

        // Loops through the entire list of prick data
        var prick_data = [];
        for (let i = 0; i < this.state.prick_data_length; i++) {
            var t_prick = new Date(this.state.prick_time_data[i]);
            // Only retrieves data between the default (or specified) start and end dates
            if(t_prick>this.state.start_date && t_prick<this.state.end_date) {
                prick_data.push({x: t_prick, y: this.state.prick_glucose_data[i]})
            }
        }

        // Loops through the entire list of note data
        var note_data = [];
        for (let i = 0; i < this.state.note_data_length; i++) {
            var t_notes = new Date(this.state.note_time_data[i]);
            //Only retrieves data between the default (or specified) start and end dates
            if(t_notes>this.state.start_date && t_notes<this.state.end_date){
                note_data.push({x: this.state.note_time_data[i], y: this.state.note[i]})
            }
        }

        // Options for the graph
        const options = {
            zoomEnabled: true,
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
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
                            <h3 className={"title"}>Time Frame</h3>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <text className={"label-text"}>From: </text>
                                    <DatePicker className='form-control' selected={ this.state.start_input } onChange={this.changeStartHandler} />
                                </div>
                                <div className='col-md-4'>
                                    <text className={"label-text"}>To: </text>
                                    <DatePicker className='form-control' selected={ this.state.end_input } onChange={this.changeEndHandler} />
                                </div>
                            </div>
                            <br></br>
                            <button className={"g-save-button"} onClick={this.saveTimeFrame}>Use Time Frame</button>

                            <br></br>
                            <h3 className={"title"}>Comments</h3>
                            <div className='card'>
                                <div className='row'>

                                    <div className='col-md-3'>
                                        <DatePicker className='form-control' selected={ this.state.comment_date } onChange={this.changeDateHandler} />
                                    </div>
                                    <div className='col'>
                                        <TimePicker className='form-control' value={ this.state.comment_time } onChange={this.changeTimeHandler}/>
                                    </div>

                                    <div className='col-md-5'>
                                        <input placeholder="type note..." name="new_note" className="form-control" value={this.state.new_note} onChange={this.changeCommentHandler}/>
                                    </div>
                                </div>
                                <button className={"g-save-button"} onClick={this.saveNote}>Add</button>
                            </div>
                            <div>
                                <div>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th className='col-4'> Time (mm/dd/yyyy) </th>
                                            <th> Note</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {note_data.map(el => (
                                            <tr>
                                                <td>{el.x}</td>
                                                <td>{el.y}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className='column'>
                            <br></br>
                            <CanvasJSChart options = {options}/>
                        </div>
                    </div>
                </div>

                <a href="./menu">
                    <button className={"page-button"}> Back </button>
                </a>
            </div>
        )
    }
}

export default GlucoseLevels
