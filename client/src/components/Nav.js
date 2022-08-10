import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className='main-nav'>
        <ul>
        <li><NavLink  to="/courses" >Courses</NavLink></li>
          <li><NavLink to="/courses/create">Create Course</NavLink></li>
          <li><NavLink to='/courses/:id/update' >UpdateCourse</NavLink></li>
          <li><NavLink  to="/courses/:id" >CourseDetail</NavLink></li>
          <li><NavLink to="/signin">UserSignIn</NavLink></li>
          <li><NavLink to='/signup' >UserSignUp</NavLink></li>
          <li><NavLink  to="/signout" >UserSignOut</NavLink></li>
          
       </ul>
       </nav>
    )
}
export default Nav;