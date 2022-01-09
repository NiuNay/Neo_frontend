import React, { Component } from 'react';
import UserService from '../services/UserService';
import PatientTable from "./PatientTable";
import PageHeader from "./PageHeader";
import "./App.css";

const id = localStorage.getItem("selectedPatient");

/**This class handles calibration parameter inputs and their submission to the system */
class Calibration extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: id,
            gradient: 1.1,
            intercept: 0.2,
            delay: 20
        }
        this.changeGradHandler = this.changeGradHandler.bind(this);
        this.changeInterHandler = this.changeInterHandler.bind(this);
        this.changeDelayHandler = this.changeDelayHandler.bind(this);
        this.saveConstants = this.saveConstants.bind(this);
    }


/**Saves the inputted values in the desired format and sends the data via corresponding services */
    saveConstants = (e) => {
        e.preventDefault();
        let calibration = {gradient: this.state.gradient, intercept: this.state.intercept};
        let delay = {delay: this.state.delay}
        console.log('calibration => ' + JSON.stringify(calibration));
        console.log('delay => ' + JSON.stringify(delay));
        if(this.state.delay && this.state.gradient && this.state.intercept){
        UserService.addCalibration(calibration,this.state.id);
        //service call
        UserService.addDelay(delay,this.state.id);
        alert("Data saved!")}
        
    }

    /**Handles the change from the default calibration gradient value to the user specified value */
    changeGradHandler= (event) => {

        this.setState({gradient: event.target.value});
    }

    /**Handles the change from the default calibration intercept value to the user specified value */
    changeInterHandler= (event) => {

        this.setState({intercept: event.target.value});
    }
    
    /**Handles the change from the default time delay value to the user specified value */
    changeDelayHandler= (event) => {

        this.setState({delay: event.target.value});
    }

render(){
    return (
        <div>
            <PageHeader title={"Calibration and Settings"}/>

            <PatientTable/>
      
                <div className={"container"}>
                    <div className={"row"}>
                        <div className = {"col-md-8 offset-md-3 offset-md-3"}>
                            <div className = "form-group row">
                                <label className={"col-5 col-form-label label-text"}> Input gradient parameter (nA)</label>
                                <div class="col-5">
                                    <input type ="number" name="number" className={"form-control"} value={this.state.gradient} onChange={this.changeGradHandler}/>
                                </div>
                            </div>
                            <div className = "form-group row">
                                <label className="col-5 col-form-label label-text"> Input intercept parameter (nA) </label>
                                <div class="col-5">
                                    <input type = "number" name="number" className={"form-control"} value={this.state.intercept} onChange={this.changeInterHandler}/>
                                </div>
                            </div>
                            <div className = "form-group row">
                                <label className="col-5 col-form-label label-text"> Input time delay (min) </label>
                                <div class="col-5">
                                    <input type = "number" name="delay" className={"form-control"} value= {this.state.delay} onChange={this.changeDelayHandler} /> 
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
        
        <center className="button-grid-2" >

            <a href="./menu">
                <button className={"page-button"} 
                        style={{backgroundColor:"#D3F8D6"}}
                        onClick={this.saveConstants}
                >Calibrate</button>
            </a>
        
            <a href="./menu">
                <button className={"page-button"}>Back to menu</button>
            </a>

        </center>     
     
        </div>


    )
}}

export default Calibration

