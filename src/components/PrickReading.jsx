import React, { Component } from 'react';
import UserService from '../services/UserService';
import PatientTable from "./PatientTable";
import PageHeader from "./PageHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';

import "./App.css";


var today = new Date();
var currentTime =today.getHours() + ":" + today.getMinutes();
const id = localStorage.getItem("selectedPatient");



/**This class handles prick reading input and submission with its corresponding time-stamps to the database */
class PrickReading extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: id,
            startDate: new Date(),
            defTime: currentTime,
	        prick_data:0
        }
        this.changeDataHandler = this.changeDataHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeTimeHandler= this.changeTimeHandler.bind(this)
        this.savePrickData= this.savePrickData.bind(this);
    }

  
/**Save prick reading in the desired format {time_instant: string, prick_date: float} and sends the data via corresponding services */
    savePrickData = (e) => {
        e.preventDefault();

        // preprocess the date string to the desired format dd/mm/yyyy 
        var date = this.state.startDate.getDate();
           
         if (date < 10) {
             date = "0"+date;
        }

        var month = this.state.startDate.getMonth()+1;
         if (month < 10) {
             month = "0"+month;
        }

        let patient = {time_instant:  date + "/"+ month +'/'+ this.state.startDate.getFullYear() + " " +  this.state.defTime + ":00", prick_data: parseFloat(this.state.prick_data)};
        if (this.state.prick_data && this.state.startDate && this.state.defTime) {
            console.log('patient => ' + JSON.stringify(patient));
            // service call
            UserService.addPrickData(patient,this.state.id);
            alert("Data saved!");
        }
        else {
            alert("Please enter prick data");
        }
    
        
    }
    
    /**Sets the value of the prick reading object based on the user input */
    changeDataHandler= (event) => {

        this.setState({prick_data: event.target.value});
    }

    /**Handles the change from the default date to the user specified date and sets the value of the startDate object */
    changeDateHandler(date) {

        this.setState({startDate: date});
    }

    /**Handles the change from the default time to the user specified time and sets the value of the defTime object*/
    changeTimeHandler(time) {

        this.setState({defTime: time});
    }

render(){
    return (
        <div>
            <PageHeader title={"Prick Readings"}/>

            <PatientTable/>

            <div className = "container">
                <div className = "row">
                    <div className = " col-md-8 offset-md-3 offset-md-3">
                    <form>
                        <div className = "form-group row">
                            <text className="col-5 col-form-label label-text"> Input prick readings (nA) </text>
                            <div className="col-5">
                                <input type = "number" placeholder="input data..." name="data" className="form-control" value={this.state.prick_data} onChange={this.changeDataHandler}/>
                            </div> 
                        </div>
                        <div className = "form-group row">
                            <text className="col-5 col-form-label label-text"> Input date </text>
                            <div className="col-5">
                                <DatePicker className='form-control' selected={ this.state.startDate } onChange={this.changeDateHandler} />
                            </div>
                        </div>
                        <div className = "form-group row">
                            <text className="col-5 col-form-label label-text"> Input time </text>
                            <div className="col-5">
                                <TimePicker className='form-control' value={ this.state.defTime } onChange={this.changeTimeHandler}/> 
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div> 
     
        <center className= "button-grid-2">
        <a href="./menu">
                <button className={"page-button"} 
                        style={{backgroundColor:"#D3F8D6"}}
                        onClick={this.savePrickData}
                >Upload data</button>
            </a>
            <a href="./menu">
                <button className={"page-button"}> Back to menu </button>
            </a>
           

        </center>
    
     
         </div>


    )
}}

export default PrickReading


