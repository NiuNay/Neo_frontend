import { useNavigate } from "react-router-dom";
import "./App.css";

export const ContinueButton = () => {
    const history = useNavigate();
    return (
        <>
          <button className={"pageButton"} onClick={() => history.goBack()}>Continue</button>
        </>
    );
};

