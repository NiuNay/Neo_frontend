import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

 const ContinueButton = () => {
    const navigate = useNavigate();
    return (
        <>
          <ConButton onClick={() => navigate.goBack()}>Continue</ConButton>
        </>
    );
};

export default ContinueButton

const ConButton = styled.button`
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
