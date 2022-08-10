import React, { Component } from 'react';

const Context = React.createContext(); 

export class Provider extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <Context.Provider>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async () => {

  }

  signOut = () => {

  }
}

export const Consumer = Context.Consumer;