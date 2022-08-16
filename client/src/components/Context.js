import React, { Component } from 'react';
import Data from './Data';

export const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: null,
    password: '',
    course: []
  };

  


  constructor() {
    super();
    this.data = new Data();
  }

  

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: { 
        signIn: this.signIn,
        signOut: this.signOut
      }
    }
    return (
      <Context.Provider value={value }>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      user.password = password;
      this.setState(() => {
        return {
          authenticatedUser: user, 
        };
      });
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}





// import React, { useState, useEffect } from "react";
// import Data from "./Data";


// export const Context = React.createContext();

// export const Provider = (props) => {
//   const data = new Data();

//   const value = {  data };
//   return( <Context.Provider value={value}>{props.children}</Context.Provider>);

//   // const signIn = async (username, password) => {
//   //   const user = await data.getUser(username, password);
//   // };

//   // const signOut = () => {};
// };

// export const Consumer = Context.Consumer;
// /**
//  * A higher-order component that wraps the provided component in a Context Consumer component.
//  * @param {class} Component - A React component.
//  * @returns {function} A higher-order component.
//  */

//  export default function withContext(Component) {
//   return function ContextComponent(props) {
//     return (
//       <Context.Consumer>
//         {context => <Component {...props} context={context} />}
//       </Context.Consumer>
//     );
//   }
// }
