import React, { PureComponent } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <div style={{position:"relative", left:"5%", top:"20%"}}>
                <h1 style={{fontFamily:"ruluko", fontSize:"20px"}}>Selected Patient</h1>
                <table style={{ fontFamily:"ruluko", width:"200px", padding:"50px 50px 50px 50px" }}>
                    <tr style={{backgroundColor:"white", }}>
                        <td style={{border:"1px solid black", padding:"5px 10px 5px 10px", }}>
                            Patient ID:
                        </td>
                        <td style={{border:"1px solid black",padding:"5px 10px 5px 10px"}}>
                            {this.state.id}
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default PatientTable