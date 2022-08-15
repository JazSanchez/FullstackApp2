import React from "react";
import { BrowserRouter, Routes, Route, ProtectedRoute} from "react-router-dom";
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
import withContext from './components/Context';
import PrivateRoute from "./PrivateRoute";
import Authenticated from "./Authenticated";

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {
  return (
  
      <div id="root">
        <BrowserRouter>
        <div>
          < HeaderWithContext />
          <Routes>
            <Route element={<PrivateRoute /> }>
            <Route path="/authenticated" component={Authenticated} />
            <Route path="/courses/create" element={<Createcourse />}/>
            <Route path="/courses/:id/update" element={<UpdateCourse />}/>
            </Route>
            <Route path="/" element= {<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path='/signin' element={<UserSignInWithContext />} />
            <Route path='/signout' element={<UserSignOutWithContext />} />
            <Route path='/signup' element={<UserSignUpWithContext />} />
            <Route path ='/notfound' element={<NotFound />} />
          </Routes>
          </div>
        </BrowserRouter>
      </div>


 
  );
}

export default App;
