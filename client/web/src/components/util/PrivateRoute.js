import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'; 

export const PrivateRoute = ({component: Component, authorized, ...rest}) => (
    <Route {...rest} render={props => (
        authorized === true
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
);

PrivateRoute.propTypes = {
	component: PropTypes.any,
	authorized: PropTypes.any,
    location: PropTypes.any
};