import styled from 'styled-components'
import "@fontsource/ruluko"
import neologo from './NeoLogo.png';
import SelectedPatient from './SelectedPatient'

const Button = styled.button`
  background-color: #F8F8F8;
  color: #515050;
  font-size: 20px;
  font-family: ruluko;
  padding: 10px 60px;
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
  padding: 10px 60px;
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
            <center>
                <img src={neologo} height={55} width={112} style={{ margin: '30px' }}/>
            </center>
            <h1 className = "text-center" style={{ color: '#565656', fontFamily: 'ruluko', fontWeight: "bold", fontSize: "40px"}}> Menu</h1>
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
            <SelectedPatient />
        </div>
    )
}

export default MainMenu