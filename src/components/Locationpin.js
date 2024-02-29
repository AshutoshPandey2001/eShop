import React from 'react'
import { SiGooglemaps } from "react-icons/si"

const Locationpin = ({ text }) => {
    return (
        <div className="pin">

            <SiGooglemaps size={70} />
            <p className="pin-text">{text}</p>
        </div>
    )
}

export default Locationpin;