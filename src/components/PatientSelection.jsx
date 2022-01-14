import React from "react";
import { DropdownButton, Dropdown, Container, Row, Col } from "react-bootstrap";
import UserService from "../services/UserService";
import PageHeader from "./PageHeader";
import "./App.css";
import "./PatientSelection.css";

let selectedPatient = ""; // stores selected patient ID

/**This class allows the user to select the patient ID from those stored in the database. It stores the selected ID
 * and makes it accessible to all other components*/
class PatientSelection extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            patients:[],
            title: "Patient ID"
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    /**Retrieves all patient IDs stored in the database*/
    componentDidMount(){
        UserService.getUsers()
            .then((response) => {
                this.setState({ patients: response.data })
            })
            .catch(() => {  // displays an alert if patient data is not retrieved
                alert("Error retrieving patient data");
            });
    }

    /**Stores the selected patient ID after user selection*/
    handleSelect(eventKey) {
        selectedPatient = eventKey;
        this.setState({title: eventKey})
        console.log("Patient ID saved: "  + eventKey);  // for programmer to easily check patient ID has been saved
        localStorage.setItem("selectedPatient", selectedPatient); // saves selected patient ID into browser local storage, making it retrievable by all other application webpages and components
    }

    /**Allows the user to proceed to the main menu page only if a patient has been selected*/
    handleClick=()=>{
        if (this.state.title === "Patient ID") {
            alert("Please select a patient");
        }
        else {
            window.open("./menu", "_self");
        }
    }

render (){
        return (
            <div className="main-div">
                <PageHeader title="Patient Selection" />
                <Container className="container">
                    <Row>
                        <Col className="left-col">Select patient</Col>
                        <Col>
                            <DropdownButton variant={"light"} size={"lg"} style={{ color:"#565656" }}
                                id="dropdown-basic-button"
                                title={this.state.title}       // displays "Patient ID" as default text
                                onSelect={this.handleSelect}
                            >
                                {
                                    this.state.patients.map(   // displays all patient IDs
                                        patient =>
                                            <Dropdown.Item className="dropdown-item"
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

                <button className="page-button"
                        style={{ position:"absolute", top:"80%", alignItems:"centre" }}
                        onClick={this.handleClick}
                >Next</button>
            </div>
        )
    }
}

export default PatientSelection