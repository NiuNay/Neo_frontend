import React, { PureComponent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PatientTable.css";

/**This class display the selected patient ID number in a table. This table is imported and displayed on every page of
 * the app*/
class PatientTable extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            id: "No Patient Selected" // default value when no patient is selected
        };
    };

    /**Retrieves the locally stored value of the selected patient ID*/
    componentDidMount() {
        const selectedPatient = localStorage.getItem("selectedPatient");
        this.setState({ id: selectedPatient });
    }

    render() {
        return (
            <div className="pt-div">
                <h1 className="pt-h1">Selected Patient</h1>
                <table className="pt-table">
                    <tbody>
                        <tr className="pt-tr">
                            <td className="pt-td">Patient ID:</td>
                            <td className="pt-td">{this.state.id}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PatientTable