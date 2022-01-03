import React, { Component } from 'react';
import neologo from "./NeoLogo.png";
import styled from 'styled-components'
import UserService from '../services/UserService';
import PatientTable from "./PatientTable";
const id = localStorage.getItem("selectedPatient");

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

    saveConstants = (e) => {
        e.preventDefault();
        let calibration = {gradient: this.state.gradient, intercept: this.state.intercept};
        let delay = {delay: this.state.delay}
        console.log('calibration => ' + JSON.stringify(calibration));
        console.log('delay => ' + JSON.stringify(delay));
        UserService.addCalibration(calibration,this.state.id);
        UserService.addDelay(delay,this.state.id);
        alert("Data saved!")
        
    }
    
    changeGradHandler= (event) => {

        this.setState({gradient: event.target.value});
    }

    changeInterHandler= (event) => {

        this.setState({intercept: event.target.value});
    }

    changeDelayHandler= (event) => {

        this.setState({delay: event.target.value});
    }

render(){
    return (
        <div>

            <center>
                <img src={neologo} height={55} width={112} style={{ margin: '30px' }}/>
            </center>
            <h1 className = "text-center" style={{ color: '#565656', fontFamily: 'ruluko', fontWeight: "bold", fontSize: "40px"}}>Callibration and Settings</h1>

            <PatientTable/>
      
                <div className = "container">
                    <div className = "row">
                        <div className = " col-md-8 offset-md-3 offset-md-3">
                            <div className = "form-group row">
                                <label className="col-5 col-form-label" style={text1}> Input gradient parameter (nA)</label>
                                <div class="col-5">
                                    <input type ="number" name="number" className="form-control" value={this.state.gradient} onChange={this.changeGradHandler}/>
                                </div>
                            </div>
                            <div className = "form-group row">
                                <label className="col-5 col-form-label" style={text1}> Input intercept parameter (nA) </label>
                                <div class="col-5">
                                    <input type = "number" name="number" className="form-control" value={this.state.intercept} onChange={this.changeInterHandler}/>
                                </div>
                            </div>
                            <div className = "form-group row">
                                <label className="col-5 col-form-label" style={text1}> Input time delay (min) </label>
                                <div class="col-5">
                                    <input type = "number" name="delay" className="form-control" value= {this.state.delay} onChange={this.changeDelayHandler} /> 
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
        
        <center className="button-grid-2" >

            <a href="./menu">
                <SaveButton onClick={this.saveConstants}>Calibrate</SaveButton>
            </a>
        
            <a href="./menu">
                <BackButton> Back to menu </BackButton>
            </a>

        </center>     
     
         </div>


    )
}}

export default Calibration

    
    const SaveButton = styled.button`
    background-color: #d3f8d6;
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
        ontFamily: 'ruluko', 
        color: '#565656',
    }
