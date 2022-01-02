import React, { Component, useState } from 'react'
import UserService from '../services/UserService'
import styled from 'styled-components'
import TimeInput from 'react-input-time';


var today = new Date();
var defDate=today.getDate() + "/" + (today.getMonth()+1) + "/" +  today.getFullYear();
var deftime =today.getHours() + ":" + today.getMinutes();
const id = localStorage.getItem("selectedPatient");


class ListCommentsTable extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: id,
            time_instant: [],
            note: [],
            data_length:0,

    }
    this.saveNote = this.saveNote.bind(this);
    
}

componentDidMount(){
    UserService.getPatientById(id).then((res) => {
        this.setState({ time_instant: res.data[4], note: res.data[5]});  
        this.setState({data_length: this.state.time_instant.length});
    });
}

saveNote = (e) => {
    e.preventDefault();
    let patient = {note: this.state.note, time_instant: this.state.date + ' ' + this.state.time + ":00"};
    if (this.state.note) {
    console.log('patient => ' + JSON.stringify(patient));
    UserService.addNote(patient,this.state.id);}
    
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



render() {

    var note_data = [];
    for (let i = 0; i < this.state.data_length; i++) {    
        note_data.push({x: this.state.time_instant[i], y: this.state.note[i]})
    }

    return (
        <div>
             <br></br>
             <div>
                    <table className="table-container">
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
             <div>
            <button className="btn btn-primary" onClick={this.saveNote}> Add new note</button>
             </div>
        </div>
    )
} }


export default ListCommentsTable



const AddButton = styled.button`
background-color: #E9E9E9;
color: #515050;
font-size: 20px;
font-family: ruluko;
padding: 10px;
border-radius: 5px;
margin: 10px 0px;
cursor: pointer;
width:20%;

`;

