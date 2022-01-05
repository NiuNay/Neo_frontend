import { useNavigate } from "react-router-dom";
import "./App.css";


 const ContinueButton = () => {
    const navigate = useNavigate();
    return (
        <>
          <button className={"pageButton"} onClick={() => navigate.goBack()}>Continue</button>
        </>
    );
};

export default ContinueButton

