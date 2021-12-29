import React, { Component } from 'react';
import neologo from "./NeoLogo.png";
import styled from 'styled-components'
import TimeInput from 'react-input-time';
import UserService from '../services/UserService';



var today = new Date(),
defDate = new String(),
deftime = new String(),
defDate=today.getDate() + '/' + (today.getMonth()+1) + '/' +  today.getFullYear()
deftime =today.getHours() + ':' + today.getMinutes()
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

    componentDidMount(){

            UserService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({note: employee.note,
                    time_instant: employee.time_instant,
                    
                });
            });
               
    }


    saveNote = (e) => {
        e.preventDefault();
        let employee = {note: this.state.note, time_instant: this.state.date + ' ' + this.state.time};
        console.log('employee => ' + JSON.stringify(employee));
        UserService.addNote(employee,this.state.id).then(res =>{
            this.props.history.push('/menu')
        });
        
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
       
         <div className="grid-columns">
            <text style={text1}> Input comment </text>
            <input placeholder="type note..." name="note" className="form-control" value={this.state.note} onChange={this.changeCommentHandler}/>
            <text style={text1}> Input date </text>
            <input name="time_instant" className="form-control" value={this.state.date} onChange={this.changeDateHandler}/>
            <text style={text1}> Input time </text>
            <TimeInput defaultValue={deftime} className="form-control" value= {this.state.time} onChange={this.changeTimeHandler} /> 
        </div> 
     
        <div className= "button-grid-2">
            <a href="./menu">
                <BackButton> Back to menu </BackButton>
            </a>
            <a href="./menu">
                <BackButton onClick={this.saveNote}>Save</BackButton>
            </a>

        </div>
    
     
         </div>


    )
}}

export default Comment

    
    const form1 = {
    position: 'absolute',
    top: "40%",
    left: "40%",
    fontSize: 20,
    ontFamily: 'ruluko', 
    color: '#565656',
    
    }
    
    const form2 = {
    position: 'absolute',
    top: "50%",
    left: "40%",
    fontSize: 20,
    ontFamily: 'ruluko', 
    color: '#565656',
    }
    
    const form3 = {
    position: 'absolute',
    top: "60%",
    left: "40%",
    fontSize: 20,
    ontFamily: 'ruluko', 
    color: '#565656',
    }
    
    const BackButton = styled.button`
    background-color: #E9E9E9;
    color: #515050;
    font-size: 20px;
    font-family: ruluko;
    border-radius: 5px;
    cursor: pointer;
    width: 100%
    `;

    const text1 = {
        fontSize: 20,
        ontFamily: 'ruluko', 
        color: '#565656',
    }
