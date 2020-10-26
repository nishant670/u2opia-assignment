import React from 'react'

import moment from 'moment'

import './SingleDay.css'

const SingleDay = props => {

    let newDate = new Date();
    const weekday = props.dateTime * 1000
    newDate.setTime(weekday)

    return (
        <div className="single-day-wrapper" onClick={props.click}>
            <p>{moment(newDate).format("dddd")}</p>
            <p>{moment(newDate).format("MMMM Do, h:mm a")}</p>
            <i className={`owf owf-${props.weatherData[0].id} owf-3x`}></i>
            <p>{Math.round(props.temperature)} °F</p>
            <p>{props.weatherData[0].description}</p>
        </div>
    )
}

export default SingleDay
