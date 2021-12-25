import React from 'react';
import neologo from "./NeoLogo.png";

function Comment() {
    return (
        <div>
            <center>
                <img src={neologo} height={55} width={112} style={{ margin: '30px' }}/>
            </center>
            <h1 className = "text-center" style={{ color: '#565656', fontFamily: 'ruluko', fontWeight: "bold", fontSize: "40px"}}>Comment</h1>
        </div>
    )
}

export default Comment