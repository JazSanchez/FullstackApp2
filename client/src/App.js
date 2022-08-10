import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";


import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import Createcourse from "./components/Createcourse";
import UpdateCourse from "./components/UpdateCourse";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UserSignUp from "./components/UserSignUp";



const HeaderWithContext = withContext(Header);


// export const  CourseContext = React.createContext();
// export const CourseDetailContext = React.createContext();

function App() {
  return (
  
      <div id="root">
        <BrowserRouter>
        <div>
          <HeaderWithContext />
          <Routes>
            {/* <Header /> */}
            <Route path="/" element= {<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/courses/create" element={<Createcourse />}/>
            {/* <Route path="/courses/:id/update" element={<UpdateCourse />}/> */}
            <Route path='/signin' element={<UserSignIn />} />
            <Route path='/signout' element={<UserSignOut />} />
            <Route path='/signup' element={<UserSignUp />} />
            <Route component={NotFound} />
          </Routes>
          </div>
        </BrowserRouter>
      </div>


 
  );
}

export default App;
