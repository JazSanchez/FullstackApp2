import React, { useState, useContext, useEffect } from "react";
import { Context } from "./Context";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from 'axios';
import ReactMarkdown from "react-markdown";

export default function CourseDetail() {
  const history = useNavigate();
  const context = useContext(Context);
  const authUser = context.authenticatedUser;
  console.log(context);

  const [course, setCourse] = useState([]);
  const [errors, setErrors] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    context.data.getCourses()
    .then(res => {
        console.log(res)
        setCourse(res)
    })
    .catch(err => {
        console.log(err)
    })


  }, [id]) 


 

   const delCourse = (id) => {
    const emailAddress = authUser.emailAddress
    const password = authUser.password
        context.data
      .deleteCourse(id, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          setErrors({ errors });
        } else {
          history("/");
          console.log("course deleted");
        }
      })
      .catch((err) => {
        console.log(err);
        history("/error");
      });

   }


return (
  <main>
  <div className="actions--bar">
      <div className="wrap">
      
              <React.Fragment>
                  <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                  <button className="button" to="button" onClick={delCourse}>Delete Course</button>
                  <Link className="button button-secondary" to="/">Return to List</Link>
              </React.Fragment> 
      </div>
  </div>
  <div className="wrap">
      <h2>Course Detail</h2>
      <form>
          <div className="main--flex">
              <div>
                  <h3 className="course--detail--title">Course</h3>
                  <h4 className="course--name">{course.title}</h4>
                    <p>
                    By {course.user.firstName} {course.user.lastName}
                    </p>
                  <ReactMarkdown>{course.description}</ReactMarkdown>    
              </div>
              <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ul className="course--detail--list">
                      <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                  </ul>
              </div>
          </div>
      </form>
  </div>
</main>)

  
}
