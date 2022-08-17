import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./index.css";


import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import Createcourse from "./components/Createcourse";
import UpdateCourse from "./components/UpdateCourse";
import Header from "./components/Header";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UserSignUp from "./components/UserSignUp";
import withContext from './components/Context';
import PrivateRoute from "./PrivateRoute";
// import Authenticated from "./Authenticated";
import Error from "./components/Error";

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {
  return (
  
      <div id="root">
        <Router>
        <div>
          < HeaderWithContext />
          <Switch>
            {/* <PrivateRoute path='/authenticated' component={Authenticated}  /> */}
            <Route  path="/" component={Courses} />
            <PrivateRoute exact path="/courses/create" component={Createcourse}/>
            <PrivateRoute  path="/courses/:id/update" component={UpdateCourse}/>
            <Route  path="/courses/:id"component={CourseDetail} />
            <Route  path='/signin' component={UserSignInWithContext} />
            <Route  path='/signout' component={UserSignOutWithContext} />
            <Route  path='/signup' component={UserSignUpWithContext} />
            <Route  path='/error' component={Error}/>
          </Switch>
          </div>
        </Router>
      </div>


 
  );
}

export default App;
