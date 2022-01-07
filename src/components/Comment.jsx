import React, { Component } from 'react';
import TimeInput from 'react-input-time';
import UserService from '../services/UserService';
import { alignPropType } from 'react-bootstrap/esm/types';
import PatientTable from "./PatientTable";
import PageHeader from "./PageHeader";
import ContinueButton from './ContinueButton'
import "./App.css";

var today = new Date();
var defDate=today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
var deftime =today.getHours() + ":" + today.getMinutes();
const id = localStorage.getItem("selectedPatient");


/**This class handles note input and submission with its corresponding time-stamp */
class Comment extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: id,
            date: defDate,
            time: deftime,
	        note:''
        }
        this.changeCommentHandler = this.changeCommentHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.saveNote = this.saveNote.bind(this);
    }


    saveNote = (e) => {
        e.preventDefault();
        let patient = {note: this.state.note, time_instant: this.state.date + ' ' + this.state.time + ":00"};
        if (this.state.note && this.state.date && this.state.time) {
        console.log('patient => ' + JSON.stringify(patient));
        UserService.addNote(patient,this.state.id);
        alert("Data saved!")}
        
    }
    
    changeCommentHandler= (event) => {

        this.setState({note: event.target.value});
    }

    changeDateHandler= (event) => {

        this.setState({date: event.target.value});
    }

    changeTimeHandler= (event) => {

        this.setState({time: event.target.value});
    }

    

render(){

    return (
        <div>
            <PageHeader title={"Comment"}/>

            <PatientTable/>

            <br></br>
                   <div className="container">
                        <div className = "row">
                            <div className="col-md-8 offset-md-3 offset-md-3">

                    <form>
                        
                            <div className="form-group row">
                                <label className="col-5 col-form-label label-text"> Input comment </label>
                                <div class="col-5">
                                <input placeholder="type note..." name="note" className="form-control" value={this.state.note} onChange={this.changeCommentHandler}/>
                                </div>
                            </div>
                        
                            <div className="form-group row">
                                <label className="col-5 col-form-label label-text"> Input date </label>
                                <div class="col-5">
                                <input name="time_instant" className="form-control" value={this.state.date} onChange={this.changeDateHandler}/>
                                </div>
                            </div>
                        
                            <div className="form-group row">
                                <label className="col-5 col-form-label label-text"> Input time </label>
                                <div class="col-5">
                                <TimeInput defaultValue={deftime} className="form-control" value= {this.state.time} onChange={this.changeTimeHandler} /> 
                                </div>
                            </div>
                       
                    </form>
                    </div>
                    </div>  
                    </div>      
                    
        <center className="button-grid-2" >

            <a href="./menu">
                <button className={"page-button"}
                        style={{backgroundColor:"#D3F8D6"}}
                        onClick={this.saveNote}
                >Upload note</button>
            </a>

                <ContinueButton/>
           
        </center>     
        </div>


    )
}}

export default Comment

