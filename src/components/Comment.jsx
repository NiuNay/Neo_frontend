import React, { Component } from 'react';
import neologo from "./NeoLogo.png";
import styled from 'styled-components'
import TimeInput from 'react-input-time';
import UserService from '../services/UserService';
import ListCommentsTable from './ListCommentsTable';
import { ContinueButton } from './ContinueButton';
import { alignPropType } from 'react-bootstrap/esm/types';

var today = new Date();
var defDate=today.getDate() + "/" + (today.getMonth()+1) + "/" +  today.getFullYear();
var deftime =today.getHours() + ":" + today.getMinutes();
const id = localStorage.getItem("selectedPatient");


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
        if (this.state.note) {
        console.log('patient => ' + JSON.stringify(patient));
        UserService.addNote(patient,this.state.id);}
        alert("Data saved!")
        
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

            <center>
                <img src={neologo} height={55} width={112} style={{ margin: '30px' }}/>
            </center>
            <h1 className = "text-center" style={{ color: '#565656', fontFamily: 'ruluko', fontWeight: "bold", fontSize: "40px"}}>Comment</h1>
       

            <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = " col-md-8 offset-md-3 offset-md-3">

                    <form>
                        
                            <div className = "form-group row">
                                <label className="col-5 col-form-label" style={text1}> Input comment </label>
                                <div class="col-5">
                                <input placeholder="type note..." name="note" className="form-control" value={this.state.note} onChange={this.changeCommentHandler}/>
                                </div>
                            </div>
                        
                            <div className = "form-group row">
                                <label className="col-5 col-form-label" style={text1}> Input date </label>
                                <div class="col-5">
                                <input name="time_instant" className="form-control" value={this.state.date} onChange={this.changeDateHandler}/>
                                </div>
                            </div>
                        
                            <div className = "form-group row">
                                <label className="col-5 col-form-label" style={text1}> Input time </label>
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
                <SaveButton onClick={this.saveNote}>Upload note</SaveButton>
            </a>
        
            <a href="./menu">
                <ContinueButton/>
            </a>

        </center>     
         </div>


    )
}}

export default Comment

    
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
