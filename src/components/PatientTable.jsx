import React, { PureComponent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PatientTable.css";
class PatientTable extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            id: "No Patient Selected" // default value when no patient is selected
        };
    };

    componentDidMount() {
        const selectedPatient = localStorage.getItem("selectedPatient");
        this.setState({ id: selectedPatient });
    }

    render() {
        return (
            <div className={"pt-div"}>
                <h1 className={"pt-h1"}>Selected Patient</h1>
                <table className={"pt-table"}>
                    <tbody>
                        <tr className={"pt-tr"}>
                            <td className={"pt-td"}>
                                Patient ID:
                            </td>
                            <td className={"pt-td"}>
                                {this.state.id}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PatientTable