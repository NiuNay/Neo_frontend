import styled from 'styled-components'
import "@fontsource/ruluko"
import PatientTable from "./PatientTable";
import PageHeader from "./PageHeader";

const Button = styled.button`
  background-color: #F8F8F8;
  color: #515050;
  font-size: 20px;
  font-family: ruluko;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  width:30%;
  margin-left:35%;
  margin-right:35%;
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

function MainMenu() {
    return (
        <div>
            <PageHeader title={"Menu"}/>

            <PatientTable/>

            <a href="./calibration">
                <Button> Calibration </Button>
            </a>
            <a href="./comment">
                <Button> Comment </Button>
            </a>
            <a href="./prickreading">
                <Button> Prick Reading </Button>
            </a>
            <a href="./glucoselevels">
                <Button> Glucose Levels </Button>
            </a>
            <a href="./patientselection">
                <BackButton> Back </BackButton>
            </a>
        </div>
    )
}

export default MainMenu