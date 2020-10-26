import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authenticated ? (
                <Component {...rest} {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: `${process.env.PUBLIC_URL}/login`,
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);