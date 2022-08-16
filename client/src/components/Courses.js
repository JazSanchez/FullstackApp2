import React, { useState, useEffect, useContext }from 'react';
import { Context } from './Context';
import { Link } from 'react-router-dom';

function Courses() {
    const context = useContext( Context);
    console.log(context);
    const [courses, setCourses] = useState([])

    useEffect(() => {
      context.data.getCourses()
      .then(res => {
          console.log(res)
          setCourses(res)
      })
      .catch(err => {
          console.log(err)
      })


    }, [])

    return(

        <main>
        <div className="wrap main--grid">
         {courses.map(course => ( //gives and index key for each course
                <Link className="course--module course--link" to={`courses/${course.id}`} key ={course.id}> 
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">{course.title}</h3> 
                </Link>))}
            <Link className="course--module course--add--module" to="/courses">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </Link>
        </div>
    </main>

    )
};

export default Courses;