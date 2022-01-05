import { useNavigate } from "react-router-dom";
import "./App.css";

 const ContinueButton = () => {
    const navigate = useNavigate();
    return (
        <>
          <button className={"pageButton"} onClick={() => history.goBack()}>Continue</button>
        </>
    );
};

