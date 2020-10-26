import * as actionTypes from './actionTypes'

import { updateObject } from './reducerUtility'

const initialState = {
    data: [],
    timeBaseData: [],
    location: '',
    selectedDay: ''
}

const forecastData = (state, action) => {
    return updateObject(state, {
        data: action.data,
        timeBaseData: action.dayData,
        location: action.location
    })
}

const selectedDay = (state, action) => {
    return updateObject(state, {
        selectedDay: action.day
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FORECAST_DATA: return forecastData(state, action)
        case actionTypes.GET_SELECTED_DAY: return selectedDay(state, action)
        default:
            return state;
    }
}

export default reducer