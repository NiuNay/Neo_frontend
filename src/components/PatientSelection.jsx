import React from 'react';
import UserService from '../services/UserService';
import styled from "styled-components";
import { DropdownButton, Dropdown, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageHeader from "./PageHeader";

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
            patients:[],
            title: "Patient ID"
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount(){
        UserService.getUsers()
            .then((response) => {
                this.setState({ patients: response.data })
            })
            .catch(() => {  // displays an alert if patient data is not retrieved
                alert("Error retrieving patient data");
            });
    }

    handleSelect(eventKey) {
        selectedPatient = eventKey;
        this.setState({title: eventKey})
        console.log("Patient selected!"  + eventKey);  // for programmer to check handleSelect worked as expected
        localStorage.setItem("selectedPatient", selectedPatient); // saves selected patient ID into browser local storage, making it retrievable by all other application webpages and components
    }

    // only allows user to proceed to main menu page if a patient has been selected. Else, throws error.
    handleClick=()=>{
        try {
            if (this.state.title === "Patient ID") {
                throw "Patient not selected";
            }
            window.open("./menu", "_self")
        } catch(err) {
            alert("Please select a patient");
        }
    }

render (){
        return (
            <div>
                <PageHeader title={"Patient Selection"} />

                <Container style={{position:"absolute", top:"30%", alignItems:"centre"}}>
                    <Row>
                        <Col style={{color: "#565656", fontFamily: "ruluko", textAlign:"right", fontSize: "30px"}}>Select patient</Col>
                        <Col>
                            <DropdownButton variant={"light"} size={"lg"} style={{fontFamily:"ruluko", color:"#565656"}}
                                id="dropdown-basic-button"
                                title={this.state.title}    // displays "Patient ID" as default text
                                onSelect={this.handleSelect}
                            >
                                {
                                    this.state.patients.map(   // displays all patient IDs
                                        patient =>
                                            <Dropdown.Item style={{fontSize:"30px"}}
                                                eventKey={patient.id}
                                                value={patient.id}
                                                key={patient.id}
                                            >{patient.id}</Dropdown.Item>
                                    )
                                }
                            </DropdownButton>
                        </Col>
                    </Row>
                </Container>

                <Button style={{position:"absolute", top:"80%", alignItems:"centre"}}
                        onClick={this.handleClick}
                >Next</Button>
            </div>
        )
    }
}

export default PatientSelection