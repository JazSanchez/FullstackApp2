import React, { useState } from 'react';

export const Context = React.createContext(); 

export const Provider = (props) => {
// const data = new Data();
 const tomato = 'Hello'
const [test, setTest]= useState('test')
  const value = {test, tomato}
    return (

      <Context.Provider value={value}>
        {props.children}
      </Context.Provider>  
    );


  
  const signIn = async () => {

  }

  const signOut = () => {

  }
}

export const Consumer = Context.Consumer;