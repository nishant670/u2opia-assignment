import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'

import * as actions from '../../store/actions'

// import { ToastContainer } from 'react-toastify'
import { failNotify } from '../../components/UI/Toast'
import SingleDay from '../../components/SingleDay/SingleDay'

import 'react-toastify/dist/ReactToastify.css';
import './WeatherScreen.css'

let currentD = new Date();
let startTime = new Date();
let endTime = new Date();
let weatherTime;
if (currentD > startTime.setHours(0, 0, 0) && currentD <= endTime.setHours(3, 0, 0)) {
    weatherTime = "03:00:00"
}
else if (currentD > startTime.setHours(3, 0, 0) && currentD <= endTime.setHours(6, 0, 0)) {
    weatherTime = "06:00:00"
}
else if (currentD > startTime.setHours(6, 0, 0) && currentD <= endTime.setHours(9, 0, 0)) {
    weatherTime = "09:00:00"
}
else if (currentD > startTime.setHours(9, 0, 0) && currentD <= endTime.setHours(12, 0, 0)) {
    weatherTime = "12:00:00"
}
else if (currentD > startTime.setHours(12, 0, 0) && currentD <= endTime.setHours(15, 0, 0)) {
    weatherTime = "15:00:00"
}
else if (currentD > startTime.setHours(15, 0, 0) && currentD <= endTime.setHours(18, 0, 0)) {
    weatherTime = "18:00:00"
}
else if (currentD > startTime.setHours(18, 0, 0) && currentD <= endTime.setHours(21, 0, 0)) {
    weatherTime = "21:00:00"
}
else if (currentD > startTime.setHours(21, 0, 0) && currentD <= endTime.setHours(0, 0, 0)) {
    weatherTime = "00:00:00"
}
else {
    console.log("Something wrong");
}


class WeatherScreen extends Component {

    // state = {
    //     isSignedIn: false,
    //     geoAccess: false,
    // }

    interval;

    componentDidMount() {
        // setTimeout(() => {
        //     this.getCoordinates();
        // }, 1000)
        this.getCoordinates();

        this.interval = setInterval(() => {
            this.getCoordinates();
        }, 10000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    getCoordinates = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this.showPosition,
                this.showError,
                { enableHighAccuracy: true, timeout: 60000, maximumAge: 600000 }
            )
        }
        else {
            failNotify("Geolocation is not supported by this browser.");
        }
    }

    showPosition = position => {
        this.setState({
            geoAccess: true,
        })

        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        sessionStorage.setItem('latitude', latitude)
        sessionStorage.setItem('longitude', longitude)
        // const latLong = { latitude, longitude }

        if (latitude && longitude) {
            this.props.forecastHandler(latitude, longitude, weatherTime)
        }
    }

    showError = error => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                failNotify("User denied the request for Geolocation")
                // this.logout();
                break;
            case error.POSITION_UNAVAILABLE:
                failNotify("Location information is unavailable")
                break;
            case error.TIMEOUT:
                failNotify("The request to get user location timed out")
                break;
            case error.UNKNOWN_ERROR:
                failNotify("An unknown error occurred")
                break;
            default:
                failNotify("Something Wrong")
        }
    }

    detailsDay = (dateTime) => {
        this.props.selectedDay(dateTime)
        this.props.history.push('/details')
    }

    logout = () => {
        firebase.auth().signOut()
            .then(function () {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                window.location = '/login'
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <div className="heading">
                    <h4>5-Day Forecast</h4>
                </div>
                <div className="forecast-wrapper">
                    {this.props.timeBaseData.map(data => {
                        return <SingleDay
                            key={data.dt}
                            temperature={data.main.temp}
                            dateTime={data.dt}
                            weatherData={data.weather}
                            click={() => this.detailsDay(data.dt)} />
                    })}
                </div>
                {/* <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} newestOnTop={false} closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <ToastContainer /> */}
                <div className="header">
                    <p>Hello {sessionStorage.getItem('user')}!!</p>
                    <button className="logout" onClick={this.logout}>Logout</button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        timeBaseData: state.timeBaseData,
        location: state.location
    }
}

const mapDispatchToProps = dispatch => {
    return {
        forecastHandler: (lat, long, weatherTime) => dispatch(actions.forecast(lat, long, weatherTime)),
        selectedDay: (day) => dispatch(actions.getSelectedDay(day))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherScreen)
