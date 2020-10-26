import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import Duration from './Duration';

class FullDetailDay extends Component {

    state = {
        thisDay: []
    }

    render() {

        const { selectedDay, fullData, location } = this.props;

            
        const dayObject = fullData.find(ob => {
            return ob.dt === selectedDay
        })

        const dateTime = dayObject.dt_txt;
        const dateToBe = dateTime.substr(0, dateTime.indexOf(' '));

        const thisDayData = fullData.filter(fl => {
            return fl.dt_txt.includes(dateToBe)
        })

        const dayIcon = thisDayData[0].weather[0].id;
        const dayTemp = thisDayData[0].main.temp;
        const dayHumidity = thisDayData[0].main.humidity;
        const dayFeelsLike = thisDayData[0].main.feels_like;
        const dayWind = thisDayData[0].wind.speed;

        const hourlyForecast = thisDayData.map(hf => {
            return (
                <Duration
                    key={hf.dt}
                    icon={hf.weather[0].id}
                    min={hf.main.temp_min}
                    max={hf.main.temp_max}
                    time={hf.dt_txt.substr(hf.dt_txt.indexOf(' ') + 1)} />
            )
        })

        // const location = 

        console.log(dateToBe)
        console.log(thisDayData)
        console.log(location)
        console.log(dayIcon)

        return (
            selectedDay ?
                <div className="detail-wrapper">
                    <div>
                        <div>
                            <p>{location}</p>
                            <p>{moment(dateTime).format('LLLL')}</p>
                        </div>
                        <div className="middle-details">
                            <div className="icon-temp">
                                <i className={`owf owf-${dayIcon} owf-5x`}></i>
                                <p className="day-temp">{dayTemp} °F</p>
                            </div>
                            <div className="other-details">
                                <p>Humidity : <strong>{dayHumidity}</strong></p>
                                <p>Feels Like : <strong>{dayFeelsLike}</strong></p>
                                <p>Wind : <strong>{dayWind} mph</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="duration-wrapper">
                        {hourlyForecast}
                    </div>
                </div> : null
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedDay: state.selectedDay,
        fullData: state.data,
        location: state.location
    }
}

export default connect(mapStateToProps)(FullDetailDay)
