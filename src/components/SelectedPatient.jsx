import React, { PureComponent } from 'react'

class SelectedPatient extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { 
            id: ""
        };
    };

    changeId = (props) => {
        this.setState({
            id: this.props.id
        });
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
                            {/* {this.props.id} */}
                            {this.state.id}
                        </td>
                    </tr>
            </table>
            </div>
        )
    }
}

SelectedPatient.defaultProps = {
    id: "No Patient Selected",
}

export default SelectedPatient