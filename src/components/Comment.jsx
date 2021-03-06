import React, { Component }from 'react';
import UserService from '../services/UserService';
import PatientTable from "./PatientTable";
import PageHeader from "./PageHeader";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

var today = new Date();
var currentTime = today.getHours() + ":" + today.getMinutes();
const id = localStorage.getItem("selectedPatient");

/**This class handles note input and submission with its corresponding time-stamps to the database */
class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: id,
            startDate: new Date,
            defTime: currentTime,
	        note:""
        }
        this.changeCommentHandler = this.changeCommentHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeTimeHandler = this.changeTimeHandler.bind(this);
        this.saveNote = this.saveNote.bind(this);
    }

/**Saves the inputted values in the desired format {note: string, time_instant: string} and sends the data via corresponding services */
    saveNote=(e)=>{
        e.preventDefault();

        var date = this.state.startDate.getDate();
        if (date < 10) {
            date = "0"+date;
        }

        var month = this.state.startDate.getMonth()+1;
        if (month < 10) {
            month = "0"+month;
        }
        let patient = {note: this.state.note, time_instant: month + "/" + date + "/" + (this.state.startDate.getFullYear()) + " " + this.state.defTime + ":00"};
        if (this.state.note && this.state.defTime) {
            console.log("patient => " + JSON.stringify(patient));
            UserService.addNote(patient,this.state.id);
            alert("Data saved!");
        }
        else {
            alert("Please enter comment");
        }
    }
    
    /**Sets the value of the note object based on the user input */
    changeCommentHandler=(event)=>{
        this.setState({note: event.target.value});
    }

    /**Handles the change of the default date to the user specified date*/
    changeDateHandler(date) {
        this.setState({startDate: date});
    }

    /**Handles the change of the default time to the user specified time*/
    changeTimeHandler=(time)=>{
        this.setState({defTime: time});
    }

    render(){
        return (
            <div>
                <PageHeader title={"Comment"}/>
                <PatientTable/>
                <br></br>
                       <div className="container">
                            <div className="row">
                                <div className="col-md-8 offset-md-2 offset-md-2">
                                    <form>
                                        <div className="form-group row">
                                            <label className="col-4 col-form-label label-text">Input comment</label>
                                            <div className="col-6">
                                                <input placeholder="type note..."
                                                       name="note"
                                                       className="form-control"
                                                       value={this.state.note}
                                                       onChange={this.changeCommentHandler}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-4 col-form-label label-text">Input date (mm/dd/yyyy)</label>
                                                <div className="col-6">
                                                    <DatePicker className="form-control"
                                                                selected={ this.state.startDate }
                                                                onChange={this.changeDateHandler}/>
                                                </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-4 col-form-label label-text">Input time</label>
                                            <div className="col-6">
                                                <TimePicker className="form-control"
                                                            value={ this.state.defTime }
                                                            onChange={this.changeTimeHandler}/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                       </div>
                <center className="button-grid-2" >
                    <a>
                        <button className="page-button"
                                style={{ backgroundColor:"#D3F8D6" }}
                                onClick={this.saveNote}
                        >Upload note</button>
                    </a>
                    <a href="./menu">
                        <button className="page-button"
                        >Go to Menu</button>
                    </a>
                    <a href="./glucoselevels">
                        <button className="page-button"
                        >View Glucose</button>
                    </a>
                </center>
            </div>
        )
    }
}

export default Comment

