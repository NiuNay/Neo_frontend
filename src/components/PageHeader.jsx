import React, { Component } from 'react';
import neologo from "./NeoLogo.png";

class PageHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            title: this.props.title
        }
    }

    render(){
        return(
            <div>
                <center>
                    <img src={neologo} alt={"Image of Neo Logo"} height={55} width={112} style={{ margin: '30px' }} />
                </center>
                <h1 className="text-center" style={{ color: '#565656', fontWeight: "bold", fontSize: "40px"}}>{this.state.title}</h1>
            </div>

        )
    }


}

export default PageHeader;