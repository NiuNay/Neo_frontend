import React, { Component } from 'react';
import styled from 'styled-components'
import TimeInput from 'react-input-time';
import UserService from '../services/UserService';
import PatientTable from "./PatientTable";
import PageHeader from "./PageHeader";


var today = new Date();
var defDate=today.getFullYear() + '-' (today.getMonth()+1) + '-' + today.getDate();
var deftime =today.getHours() + ":" + today.getMinutes();
const id = localStorage.getItem("selectedPatient");

class PrickReading extends Component {



    constructor(props) {
        super(props)

        this.state = {
            id: id,
            date: defDate,
            time: deftime,
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
        let patient = {prick_data: this.state.prick_data, time_instant: this.state.date + ' ' + this.state.time + ":00"};
        if (this.state.prick_data && this.state.date && this.state.time) {
        console.log('patient => ' + JSON.stringify(patient));
        UserService.addPrickData(patient,this.state.id)
        alert("Data saved!")
        }
    
        
    }
    
    changeDataHandler= (event) => {

        this.setState({prick_data: event.target.value});
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
            <PageHeader title={"Prick Readings"}/>

            <PatientTable/>

            <div className = "container">
                <div className = "row">
                    <div className = " col-md-8 offset-md-3 offset-md-3">
                    <form>
                        <div className = "form-group row">
                            <text className="col-5 col-form-label" style={text1}> Input prick readings (nA) </text>
                            <div class="col-5">
                                <input type = "number" placeholder="input data..." name="data" className="form-control" value={this.state.prick_data} onChange={this.changeDataHandler}/>
                            </div> 
                        </div>
                        <div className = "form-group row">
                            <text className="col-5 col-form-label" style={text1}> Input date </text>
                            <div class="col-5">
                                <input name="time_instant" className="form-control" value={this.state.date} onChange={this.changeDateHandler}/>
                            </div>
                        </div>
                        <div className = "form-group row">
                            <text className="col-5 col-form-label" style={text1}> Input time </text>
                            <div class="col-5">
                                <TimeInput defaultValue={deftime} className="form-control" value= {this.state.time} onChange={this.changeTimeHandler} /> 
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div> 
     
        <center className= "button-grid-2">
        <a href="./menu">
                <SaveButton onClick={this.savePrickData}>Upload data</SaveButton>
            </a>
            <a href="./menu">
                <BackButton> Back to menu </BackButton>
            </a>
           

        </center>
    
     
         </div>


    )
}}

export default PrickReading

        
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
        fontFamily: 'ruluko',
        color: '#565656',
    }
