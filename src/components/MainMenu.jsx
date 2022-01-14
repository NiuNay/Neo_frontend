import PatientTable from "./PatientTable";
import PageHeader from "./PageHeader";
import "./App.css";
import "@fontsource/ruluko";

function MainMenu() {
    return (
        <div>
            <PageHeader title={"Menu"}/>
            <PatientTable/>
            <a href="./calibration">
                <button className="menu-button">Calibration</button>
            </a>
            <a href="./comment">
                <button className="menu-button">Comment</button>
            </a>
            <a href="./prickreading">
                <button className="menu-button">Prick Reading</button>
            </a>
            <a href="./glucoselevels">
                <button className="menu-button">Glucose Levels</button>
            </a>
            <a href="./patientselection">
                <button className="page-button">Back</button>
            </a>
        </div>
    )
}

export default MainMenu