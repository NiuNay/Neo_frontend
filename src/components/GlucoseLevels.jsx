import React from 'react';
import styles from "./styles.css"
import CanvasJSReact from '../lib/canvasjs.react';
import UserService from "../services/UserService";
import PatientTable from "./PatientTable";
import PageHeader from "./PageHeader";
import "./App.css";
import "./GlucoseLevels.css"


var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const id = localStorage.getItem("selectedPatient");

/**This class handles the graphing of the patient's glucose levels over time and associated functionalities (choosing
 * a custom time frame of data to view, viewing and inputting notes).*/
class GlucoseLevels extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            id: id,
            sweat_time_data:[],
            sweat_glucose_data: [],
            prick_time_data: [],
            prick_glucose_data: [],
            note_time_data: [],
            note: [],
            note_data_length:0,
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
                const plotted_day = start.getDate()+ "/" + (start.getMonth()+1) +"/" + start.getFullYear();
                this.setState({start_date: start, end_date: end, end_input: plotted_day, start_input: plotted_day})
            })
            .catch(() => {                          // checks data was retrieved
                alert("Error retrieving patient data");
            });
    }

    /**Saves the inputted values in the desired format*/
    saveTimeFrame = (e) => {
        e.preventDefault();
        var end_string = this.state.end_input;
        // Changing format from dd/mm/yyyy to mm/dd/yyyy so that Date() works as intended
        const end_array = end_string.split('/');
        [end_array[0], end_array[1]] = [end_array[1], end_array[0]];
        end_string = end_array.join("-")
        const end = new Date(end_string);
        end.setDate(end.getDate()+1);

        var start_string = this.state.start_input;
        // Changing format from dd/mm/yyyy to mm/dd/yyyy so that Date() works as intended
        const start_array = start_string.split('/');
        [start_array[0], start_array[1]] = [start_array[1], start_array[0]];
        start_string = start_array.join("-")
        const start = new Date(start_string);

        // Saving the start and end date values
        this.setState({end_date: end, start_date: start});
    }

    /**Handles the change from the default value to the user specified value */
    changeEndHandler = (event) => {
        this.setState({end_input: event.target.value});
    }
    changeStartHandler = (event) => {
        this.setState({start_input: event.target.value});
    }

    render (){
        var sweat_data = [];
        // Looping through the entire list of sweat data
        for (let i = 0; i < this.state.sweat_data_length; i++) {
            var t = new Date(this.state.sweat_time_data[i]);
            // Only retrieving data between the default (or specified) start and end dates
            if(t>this.state.start_date && t<this.state.end_date) {
                sweat_data.push({x: t, y: this.state.sweat_glucose_data[i]})
            }
        }

        // Looping through the entire list of prick data
        var prick_data = [];
        for (let i = 0; i < this.state.prick_data_length; i++) {
            var t = new Date(this.state.prick_time_data[i]);
            // Only retrieving data between the default (or specified) start and end dates
            if(t>this.state.start_date && t<this.state.end_date) {
                prick_data.push({x: t, y: this.state.prick_glucose_data[i]})
            }
        }

        // Looping through the entire list of note data
        var note_data = [];
        for (let i = 0; i < this.state.note_time_data.length; i++) {   
            var t = new Date(this.state.note_time_data[i]);
            // Only retrieving data between the default (or specified) start and end dates
            if(t>this.state.start_date && t<this.state.end_date){
            note_data.push({x: ((this.state.note_time_data[i]).substring(0,10) + ' ' +(this.state.note_time_data[i]).substring(11,19)), y: this.state.note[i]})
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
                            <h3 className={"title"}>Comments</h3>
                            
                            <div>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th> Time</th>
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
                        <a href='./comment'>
                        <button className={"g-save-button"}> Add new note</button>
                        </a>
                    </div>
                            <h3 className={"title"}>Time Frame</h3>
                            <text className={"label-text"}>From: </text>
                            <input name="time_instant" className={"form-control"} value={this.state.start_input} onChange={this.changeStartHandler}/>
                            <text className={"label-text"}>To: </text>
                            <input name="time_instant" className={"form-control"} value={this.state.end_input} onChange={this.changeEndHandler}/>
                            <button className={"g-save-button"} onClick={this.saveTimeFrame}>Load graph</button>
                        </div>
                        <div className='column'>
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
