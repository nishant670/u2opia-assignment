import React from 'react'

const Duration = props => {
    return (
        <div className="duration">
            <i className={`owf owf-${props.icon} owf-3x`}></i>
            <p>Min : {props.min} °F</p>
            <p>Max: {props.max} °F</p>
            <p>{props.time}</p>
        </div>
    )
}

export default Duration
