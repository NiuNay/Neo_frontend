import React, { Component, useState }from 'react';
import UserService from '../services/UserService';
import PatientTable from "./PatientTable";
import PageHeader from "./PageHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import TimePicker from 'react-time-picker';

var today = new Date();
var currentTime =today.getHours() + ":" + today.getMinutes();
const id = localStorage.getItem("selectedPatient");


/**This class handles note input and submission with its corresponding time-stamp */
class Comment extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: id,
            startDate: new Date,
            defTime: currentTime,
	        note:''
        }
        this.changeCommentHandler = this.changeCommentHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeTimeHandler = this.changeTimeHandler.bind(this);
        this.saveNote = this.saveNote.bind(this);
    }


    saveNote = (e) => {
        e.preventDefault();
        let patient = {note: this.state.note, time_instant: (this.state.startDate.getFullYear()) + "-" + (this.state.startDate.getMonth()+1)+'-'+(this.state.startDate.getDate()) + 'T' + this.state.defTime + ":00"};
        if (this.state.note && this.state.defTime) {
        console.log('patient => ' + JSON.stringify(patient));
        UserService.addNote(patient,this.state.id);
        alert("Data saved!")}
        
    }
    
    changeCommentHandler= (event) => {

        this.setState({note: event.target.value});
    }

    changeDateHandler(date) {

        this.setState({startDate: date});
    }

    changeTimeHandler= (time) => {

        this.setState({defTime: time});
    }

   
render(){
   
    return (
        <div>
            <PageHeader title={"Comment"}/>

            <PatientTable/>

            <br></br>
                   <div className="container">
                        <div className = "row">
                            <div className="col-md-8 offset-md-2 offset-md-2">

                    <form>
                        
                            <div className="form-group row">
                                <label className="col-4 col-form-label label-text"> Input comment </label>
                                <div class="col-6">
                                <input placeholder="type note..." name="note" className="form-control" value={this.state.note} onChange={this.changeCommentHandler}/>
                                </div>
                            </div>
                        
                            <div className="form-group row">
                                <label className="col-4 col-form-label label-text"> Input date </label>
                                <div class="col-6">
                                    <DatePicker className='form-control' selected={ this.state.startDate } onChange={this.changeDateHandler} /> 
                                </div>
                            </div>
                        
                            <div className="form-group row">
                                <label className="col-4 col-form-label label-text"> Input time </label>
                                <div class="col-6">
                                     <TimePicker className='form-control' value={ this.state.defTime } onChange={this.changeTimeHandler}/> 
                            </div> </div>

                    </form>
                    </div>
                    </div>  
                    </div>      
                    
        <center className="button-grid-2" >

            <a>
                <button className={"page-button"}
                        style={{backgroundColor:"#D3F8D6"}}
                        onClick={this.saveNote}
                >Upload note</button>
            </a>
            <a href="./menu">
                <button className={"page-button"}
                        
                >Go to Menu</button>
            </a>
            <a href="./glucoselevels">
                <button className={"page-button"}
                >View Glucose</button>
            </a>

                
           
        </center>     
        </div>


    )
}}

export default Comment

