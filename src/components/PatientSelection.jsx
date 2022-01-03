import React from 'react';
import UserService from '../services/UserService';
import styled from "styled-components";
import neologo from "./NeoLogo.png";
import {DropdownButton, Dropdown, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Button = styled.button`
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


let selectedPatient = ""; // stores selected patient ID

class PatientSelection extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            users:[],
            title: "Patient ID"
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount(){
        UserService.getUsers()
            .then((response) => {
                this.setState({ users: response.data })
            })
            .catch(() => { // checks data was retrieved
                alert("Error retrieving patient data");
            });
    }

    handleSelect(eventKey) {
        selectedPatient = eventKey;
        this.setState({title: eventKey})
        console.log("Patient selected!"  + eventKey);  // for programmer to check handleSelect worked as expected
        localStorage.setItem("selectedPatient", selectedPatient); // saves selected patient ID into browser local storage, making it retrievable by all other application webpages and components
    }

    render (){
        return (
            <div>
                <center>
                    <img src={neologo} height={55} width={112} style={{ margin: '30px' }}/>
                </center>
                <h1 className = "text-center" style={{ color: '#565656', fontFamily: 'ruluko', fontWeight: "bold", fontSize: "40px"}}>Patient Selection</h1>

                <Container style={{position:"absolute", top:"30%", alignItems:"centre"}}>
                    <Row>
                        <Col style={{color: "#565656", fontFamily: "ruluko", textAlign:"right", fontSize: "30px"}}>Select patient</Col>
                        <Col >
                            <DropdownButton variant={"light"} size={"lg"} style={{fontFamily:"ruluko", color:"#565656"}}
                                id="dropdown-basic-button"
                                title={this.state.title}
                                onSelect={this.handleSelect}
                            >
                                {
                                    this.state.users.map(
                                        user =>
                                            <Dropdown.Item style={{fontSize:"30px"}}
                                                eventKey={user.id}
                                                value={user.id}
                                                key={user.id}
                                            >{user.id}</Dropdown.Item>
                                    )
                                }
                            </DropdownButton>
                        </Col>
                    </Row>
                </Container>

                <a href="./menu" >
                    <Button style={{position:"absolute", top:"80%", alignItems:"centre"}}> Next </Button>
                </a>
            </div>
        )
    }
}

export default PatientSelection