import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { PrivateRoute } from './PrivateRoute'

import WeatherScreen from '../containers/WeatherScreen/WeatherScreen'
import DayDetails from '../components/SingleDay/FullDetailDay'
import Login from '../containers/Login/Login'

const AppRoutes = () => {

    let authenticated = '';
    if (sessionStorage.getItem('token')) {
        authenticated = sessionStorage.getItem('token');
    } else {
        authenticated = false;
    }

    return (
        <Switch>
            <Route path={`${process.env.PUBLIC_URL}/login`} exact component={Login} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/details`} exact authenticated={authenticated}
                component={DayDetails} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/`} exact authenticated={authenticated}
                component={WeatherScreen} />
        </Switch>
        // <Switch>
        //     <Route path={`${process.env.PUBLIC_URL + '/login'}`} component={Login} />
        //     <Route path={`${process.env.PUBLIC_URL + '/details'}`} component={DayDetails} />
        //     <Route path={`${process.env.PUBLIC_URL + '/'}`} component={WeatherScreen} />
        // </Switch>
    )
}

export default AppRoutes
