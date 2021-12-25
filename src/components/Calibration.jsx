import React from 'react';
import neologo from "./NeoLogo.png";

function Calibration() {
    return (
        <div>
            <center>
                <img src={neologo} height={55} width={112} style={{ margin: '30px' }}/>
            </center>
            <h1 className = "text-center" style={{ color: '#565656', fontFamily: 'ruluko', fontWeight: "bold", fontSize: "40px"}}>Calibration</h1>
        </div>
    )
}

export default Calibration