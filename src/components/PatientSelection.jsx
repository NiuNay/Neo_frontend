import React from 'react';
import UserService from '../services/UserService';
import styled from "styled-components";
import neologo from "./NeoLogo.png";

const Button = styled.button`
  background-color: #E9E9E9;
  color: #515050;
  font-size: 20px;
  font-family: ruluko;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  width:20%;
  margin-left:40%;
  margin-right:40%;
`;

class PatientSelection extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
    }

    componentDidMount(){
        UserService.getUsers().then((response) => {
            this.setState({ users: response.data})
        });
    }

    render (){
        return (
            <div>
                <center>
                    <img src={neologo} height={55} width={112} style={{ margin: '30px' }}/>
                </center>
                <h1 className = "text-center" style={{ color: '#565656', fontFamily: 'ruluko', fontWeight: "bold", fontSize: "40px"}}>Patient Selection</h1>
                <table className = "table table-striped">
                    <thead>
                    <tr>
                        <td>Patient ID</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(
                            user =>
                                <tr key = {user.id}>
                                    <td> {user.id}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                <a href="./menu">
                    <Button> Next </Button>
                </a>
            </div>

        )
    }
}

export default PatientSelection