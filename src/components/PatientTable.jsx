import React, { PureComponent } from 'react'

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
            <div>
                 <table> 
                    <tr>
                        <td>
                            Selected Patient ID:
                        </td>
                        <td>
                            {this.state.id}
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default PatientTable