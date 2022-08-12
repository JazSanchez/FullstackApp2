import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Consumer } from './components/Context';

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Outlet
          {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Navigate to={{
                pathname: '/signin',
                state: { from: props.location }
              }} />
            )
          }
        />
    )}
    </Consumer>
  );
}