import React, { useState, useEffect } from "react";
import Data from "./Data";
import axios from "axios";

export const Context = React.createContext();

export const Provider = (props) => {
  const data = new Data();
  const api = async () => {
    const { data } = await axios("http://localhost:5000/api/courses");

    setCourses(data.answer);
  };
  const [courses, setCourses] = useState([]);

  const value = { api, data };
  return <Context.Provider value={value}>{props.children}</Context.Provider>;

  const signIn = async (username, password) => {
    const user = await data.getUser(username, password);
    return user;
  };

  const signOut = () => {};
};

export const Consumer = Context.Consumer;
