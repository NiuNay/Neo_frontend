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

class PrickReading extends Component {



    constructor(props) {
        super(props)

        this.state = {
            id: id,
            startDate: new Date,
            defTime: currentTime,
	        prick_data:''
        }
        this.changeDataHandler = this.changeDataHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.savePrickData= this.savePrickData.bind(this);
    }

    componentDidMount(){

            UserService.getPatientById(this.state.id).then( (res) =>{
                let patient = res.data;
                this.setState({prick_data: patient.prick_data,
                    time_instant: patient.time_instant,
                    
                });
            });
               
    }


    savePrickData = (e) => {
        e.preventDefault();
        let patient = {prick_data: this.state.prick_data, time_instant: (this.state.startDate).toLocaleDateString().substring(0,14) + 'T' + this.state.defTime + ":00"};
        if (this.state.prick_data && this.state.startDate && this.state.defTime) {
        console.log('patient => ' + JSON.stringify(patient));
        UserService.addPrickData(patient,this.state.id)
        alert("Data saved!")
        }
    
        
    }
    
    changeDataHandler= (event) => {

        this.setState({prick_data: event.target.value});
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
            <PageHeader title={"Prick Readings"}/>

            <PatientTable/>

            <div className = "container">
                <div className = "row">
                    <div className = " col-md-8 offset-md-3 offset-md-3">
                    <form>
                        <div className = "form-group row">
                            <text className="col-5 col-form-label label-text"> Input prick readings (nA) </text>
                            <div class="col-5">
                                <input type = "number" placeholder="input data..." name="data" className="form-control" value={this.state.prick_data} onChange={this.changeDataHandler}/>
                            </div> 
                        </div>
                        <div className = "form-group row">
                            <text className="col-5 col-form-label label-text"> Input date </text>
                            <div class="col-5">
                                <DatePicker className='form-control' selected={ this.state.startDate } onChange={this.changeDateHandler} />
                            </div>
                        </div>
                        <div className = "form-group row">
                            <text className="col-5 col-form-label label-text"> Input time </text>
                            <div class="col-5">
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


