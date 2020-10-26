import * as actionTypes from './actionTypes'

import axios from 'axios'

import { OWM_KEY } from '../constants/ApiKey'

export const forecastData = (data, dayData, location) => {
    return {
        type: actionTypes.FORECAST_DATA,
        data: data,
        dayData: dayData,
        location: location
    }
}

export const getSelectedDay = (day) => {
    return {
        type: actionTypes.GET_SELECTED_DAY,
        day: day
    }
}

export const forecast = (lat, long, weatherTime) => {
    return dispatch => {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${OWM_KEY}`)
            .then(response => {
                console.log(response)
                const data = response.data.list
                const filteredData = response.data.list.filter(dt => {
                    return dt.dt_txt.includes(weatherTime)
                })
                const location = `${response.data.city.name}, ${response.data.city.country}`
                console.log(location)
                dispatch(forecastData(data, filteredData, location))
            })
            .catch(error => console.log(error))
    }
}

