
//Import dependencies
import React, { Component } from 'react';
import Data from './Data'; 

//Create a variable I can export 
export const Context = React.createContext(); 

// 
export class Provider extends Component {


  //Set up the initial state of authenticatedUser, password and course
  state = {
    authenticatedUser: null,
    password: '',
    course: []
  };

  

//A constructed that holds any newData created
  constructor() {
    super();
    this.data = new Data();
  }

  

  render() {
    const { authenticatedUser } = this.state;// Variable that hold the state of the authenticatedUser

    //A variable named value that holds the authenticatedUser, data and actions that may be inputed/changed and passed down the component tree
    const value = {
      authenticatedUser,
      data: this.data,
      actions: { 
        signIn: this.signIn,
        signOut: this.signOut
      }
    }
    return (
      //The Context.Provider which hold the value of the information and passes it on to all it's children
      <Context.Provider value={value }>
        {this.props.children}
      </Context.Provider>  
    );
  }

  //SignIn async fn that takes in two arguments(emailAddress and Password)
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);//Variable named user that awaits a promise. The returned promise will be the authenticatedUsers email and password
    if (user !== null) {//If user is not null then an authenticated user will be returned
      user.password = password;
      this.setState(() => {
        return {
          authenticatedUser: user, 
        };
      });
    }
    return user;
  }
 
  //SignOut function that sets the authenticated User to null
  signOut = () => {
    this.setState({ authenticatedUser: null });
  }
}

export const Consumer = Context.Consumer;//exports the consumer

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





